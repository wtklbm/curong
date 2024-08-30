import { isIntSafe } from '@curong/types';

import type { MemoizeWithReturn } from './types';

/**
 * 返回一个异步函数，并缓存函数的计算结果
 *
 * `memoizeWithAsync` 是一个高阶函数，用于对传入的函数 `func` 进行缓存，从而提升性能。
 * 该函数通过自定义的键生成函数 `harsher` 来生成缓存键，以实现对函数结果的缓存和重用。
 *
 * 该方法会返回一个新的函数，该函数除了具备原始函数的功能外，还具有以下特性：
 *  - 支持结果缓存，避免重复计算
 *  - 默认情况下，该函数使用 `Map` 作为缓存的存储容器
 *    可以通过设置 `memoizeWithAsync.cacheInitializer` 属性来自定义缓存容器
 *  - 具有 `cache` 属性，存储缓存的结果
 *  - 具备 `clear()` 方法，可以手动清除缓存
 *  - 具备 `delete()` 方法，可以手动清除指定键的缓存
 *
 * @param func 要缓存的原始函数
 * @param harsher 用于生成缓存键的函数
 * @param timeoutMs 当前缓存的值经过多少毫秒后超时
 *  - 如果是负数，则表示立即超时
 *  - 如果传递的是 0，因为 `JavaScript` 的执行效率，多次执行一个函数，经过几次后超时并不能完全确定
 *  - 如果是正数，则当前时间加该值的结果为超时的最终时间
 *  - 如果不传递或者传递其他非整数值，则不使用缓存超时功能
 * @returns 包含缓存功能的函数
 * @example
 *
 * ```typescript
 * const memoizedFunction = memoizeWithAsync(
 *   (x: number) => x * 2,
 *   (x: number) => x
 * );
 *
 * console.log(await memoizedFunction(2)); // 计算并返回 4
 * console.log(await memoizedFunction(2)); // 直接从缓存中返回 4
 *
 * memoizedFunction.clear(); // 清空缓存
 * console.log(await memoizedFunction(2)); // 重新计算并返回 4
 * ```
 */
function memoizeWithAsync<F extends (...args: any[]) => any, K>(
    func: F,
    harsher: (...args: Parameters<F>) => K,
    timeoutMs?: number
): MemoizeWithReturn<F, K> {
    const cache = new memoizeWithAsync.cacheInitializer<
        ReturnType<typeof harsher>,
        { value: ReturnType<F>; expiration: number }
    >();

    const queues: Map<
        ReturnType<typeof harsher>,
        Promise<ReturnType<F>>
    > = new Map();

    const memoized = (async (
        ...args: Parameters<F>
    ): Promise<ReturnType<F>> => {
        const key = harsher(...args);
        const isTimeoutMs = isIntSafe(timeoutMs);

        // 如果之前记录过
        if (cache.has(key)) {
            const cacheValue = cache.get(key)!;

            // 如果没有超时就返回之前记录的值
            if (!isTimeoutMs || Date.now() <= cacheValue.expiration) {
                return cacheValue.value;
            }
        }

        // 如果队列中存在，就从队列中获取
        if (queues.has(key)) {
            return await queues.get(key)!;
        }

        // 如果没有记录过，就执行函数，并获取结果
        const promise = func.apply(func, args);
        queues.set(key, promise);

        try {
            const value = await queues.get(key)!;
            cache.set(key, {
                value,
                expiration: isTimeoutMs ? Date.now() + timeoutMs : NaN
            });
            return value;
        } finally {
            queues.delete(key);
        }
    }) as MemoizeWithReturn<F, K>;

    memoized.cache = cache;
    memoized.clear = () => cache.clear();
    memoized.delete = (...args: Parameters<F>) => {
        const key = harsher(...args);

        if (cache.has(key)) {
            cache.delete(key);
        }
    };

    return memoized as MemoizeWithReturn<F, K>;
}

/** 缓存仓库 */
memoizeWithAsync.cacheInitializer = Map;

export default memoizeWithAsync;
