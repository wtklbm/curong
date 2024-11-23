import { isSyncFunction, isUintSafe } from '@curong/types';

/**
 * 返回一个函数，当函数执行到达指定次数后执行回调函数
 *
 * @param count 要执行的总次数，它是一个大于或等于 `0` 的安全整数
 * @param callback 当次数到达时所要执行的回调函数
 * @param args 传递给 `callback` 的参数
 * @returns 返回一个函数。
 *  当调用该函数的次数达到 `count` 时，就会调用 `callback`。
 *  如果没有达到指定的次数，就会返回一个接受剩余次数的新函数。
 * @throws
 *  - 如果 `count` 不是大于或等于 `0` 的安全整数，则会抛出类型错误异常
 *  - 如果 `callback` 不是同步函数，则会抛出类型错误异常
 * @example ````
 *
 * ### 常规示例
 *
 * ```typescript
 * const r = runAfterTimes(3, () => 10);
 * console.log(r()()()); // 10
 * ```
 *
 * ### 异步读取文件，并等待所有文件读取完毕，然后打印出数据
 *
 * ```typescript
 * const data = {};
 * const ready = runAfterTimes(2, () => console.log(data));
 *
 * readFile('./a.txt', 'utf8', (_err, data) => {
 *     data['a'] = data;
 *     ready();
 * });
 *
 * readFile('./b.txt', 'utf8', (_err, data) => {
 *     data['b'] = data;
 *     ready();
 * });
 * ```
 *
 * # 柯里化函数
 *
 * 该函数是柯里化函数，柯里化函数就是把一个大函数拆分成很多的具体的功能的小函数。
 * 高阶函数中包含柯里化，柯理化的好处是可以保留参数，它非常像 `bind` 方法。
 */
export default function runAfterTimes<R, A extends unknown[]>(
    count: number,
    callback: (...args: A) => R,
    ...args: A
): () => any {
    if (!isUintSafe(count)) {
        throw new TypeError(
            '[runAfterTimes] count 不是大于或等于 0 的安全整数',
            {
                cause: { count, callback, ...args }
            }
        );
    }

    if (!isSyncFunction(callback)) {
        throw new TypeError('[runAfterTimes] callback 必须是一个同步函数', {
            cause: { count, callback, ...args }
        });
    }

    const reachCall = () =>
        --count <= 0 ? callback.apply(callback, args) : reachCall;

    return reachCall;
}
