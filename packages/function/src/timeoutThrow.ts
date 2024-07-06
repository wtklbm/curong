import setTimeout from './setTimeout';

/**
 * 执行一个函数，并获取函数的返回值。如果函数的执行时间超过 `duration` 时，就会抛出异常
 *
 * @param duration 一个以毫秒为单位的超时时间
 *  - 如果 `duration` 为小于或等于 `0` 的数字，则会尽快抛出异常
 *  - 如果 `duration` 为一个大于 `0` 的数字，则表示至少应等待 `duration` 毫秒后抛出异常
 * @param fn 要执行的同步或异步函数
 * @param args 要传递给函数的参数
 * @returns 如果函数执行的时间没有超时，则返回函数的返回值，否则返回一个超时错误
 * @throw 如果方法已超时，则会抛出 `EvalError` 异常
 * @example
 *
 * ```typescript
 * const fn = (a, b) => a + b;
 * const ret = await timeoutThrow(1e3, fn, 1, 2);
 * console.log(ret); // 3
 * ```
 */
export default async function timeoutThrow<A extends unknown[], R = unknown>(
    duration: number,
    fn: (...args: A) => Promise<R> | R,
    ...args: A
): Promise<R> {
    return Promise.race([
        Promise.resolve(fn.apply(fn, args)),
        new Promise<R>((_, reject) => {
            setTimeout(() => {
                reject(
                    new EvalError(
                        `[timeoutThrow]: 该方法执行的时间已超时: "${duration}ms"`
                    )
                );
            }, duration);
        })
    ]);
}
