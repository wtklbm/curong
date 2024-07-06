/** 超时时错误 */
export class TimeoutThrowError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TimeoutError';
    }
}

/**
 * 执行一个函数，并获取函数的返回值。如果函数的执行时间超过 `duration` 时，就会抛出异常
 *
 * @param duration 一个以毫秒为单位的超时时间
 *  - 如果 `duration` 为小于或等于 `0` 的数字，则表示定时器应尽快执行
 *  - 如果 `duration` 为一个大于 `0` 的数字，则表示至少应等待 `duration` 毫秒后执行
 * @param fn 要执行的同步或异步函数
 * @param args 要传递给函数的参数
 * @returns 如果函数执行的时间没有超时，则返回函数的返回值，否则返回一个超时错误
 * @throw 如果方法已超时，则会抛出 `TimeoutThrowError` 异常
 * @example
 *
 * ```typescript
 * const fn = (a, b) => a + b;
 * const ret = await timeoutThrow(1e3, fn, 1, 2);
 * console.log(ret); // 3
 * ```
 */
export default async function timeoutThrow<
    A extends readonly unknown[],
    R = unknown
>(duration: number, fn: (...args: A) => R, ...args: A): Promise<R> {
    return Promise.race([
        Promise.resolve(fn(...args)),
        new Promise((_, reject) => {
            let timer: any = setTimeout(() => {
                clearTimeout(timer);
                timer = null;

                reject(
                    new TimeoutThrowError(
                        `[timeoutThrow]: 该方法执行的时间已超时: "${duration}ms"`
                    )
                );
            }, duration);
        }) as Promise<R>
    ]);
}
