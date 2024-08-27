import type { MemoizeWithReturn } from './types';

/**
 * 返回一个新函数，并缓存函数的计算结果
 *
 * `memoizeWith` 是一个高阶函数，用于对传入的函数 `func` 进行缓存，从而提升性能。
 * 该函数通过自定义的键生成函数 `harsher` 来生成缓存键，以实现对函数结果的缓存和重用。
 *
 * 该方法会返回一个新的函数，该函数除了具备原始函数的功能外，还具有以下特性：
 *  - 支持结果缓存，避免重复计算
 *  - 默认情况下，`memoizeWith` 使用 `Map` 作为缓存的存储容器
 *    可以通过设置 `memoizeWith.cacheInitializer` 属性来自定义缓存容器
 *  - 具备 `clear()` 方法，可以手动清除缓存
 *  - 具有 `cache` 属性，存储缓存的结果
 *
 * @param func 要缓存的原始函数
 * @param harsher 用于生成缓存键的函数
 * @returns 包含缓存功能的函数
 * @example
 *
 * ```typescript
 * const memoizedFunction = memoizeWith(
 *   (x: number) => x * 2,
 *   (x: number) => x
 * );
 *
 * console.log(memoizedFunction(2)); // 计算并返回 4
 * console.log(memoizedFunction(2)); // 直接从缓存中返回 4
 *
 * memoizedFunction.clear(); // 清空缓存
 * console.log(memoizedFunction(2)); // 重新计算并返回 4
 * ```
 */
function memoizeWith<F extends (...args: any[]) => any, K>(
    func: F,
    harsher: (...args: Parameters<F>) => K
): MemoizeWithReturn<F, K> {
    // 使用指定的缓存类型，如果没有指定则默认为 Map
    const cache = new memoizeWith.cacheInitializer<
        ReturnType<NonNullable<typeof harsher>>,
        ReturnType<F>
    >();

    function memoized(...args: Parameters<F>): ReturnType<F> {
        // 生成缓存键
        const key = harsher(...args);

        // 检查缓存
        if (cache.has(key)) {
            return cache.get(key) as ReturnType<F>;
        }

        // 如果未缓存，调用原始函数并缓存结果
        const result = func.apply(func, args);
        cache.set(key, result);
        return result;
    }

    // 清除缓存的函数
    memoized.clear = () => cache.clear();
    memoized.cache = cache;

    return memoized as MemoizeWithReturn<F, K>;
}

/** 缓存仓库 */
memoizeWith.cacheInitializer = Map;

export default memoizeWith;
