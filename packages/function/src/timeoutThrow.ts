import { isUint } from '@curong/types';

const delayFn = <R = any>(duration: number): Promise<R> =>
    new Promise((_, reject) => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            reject(
                new Error(
                    `[timeoutThrow]: 该方法执行的时间已超时: "${duration}ms"`
                )
            );
        }, duration);
    });

/**
 * 执行一个函数，并获取函数的返回值。如果函数的执行时间超过 `duration` 时，就会抛出异常
 *
 * @param duration 一个以毫秒为单位的超时时间
 * @param fn 要执行的同步或异步函数
 * @param args 要传递给函数的参数
 * @returns 如果函数执行的时间没有超时，则返回函数的返回值，否则返回一个超时错误
 * @example
 *
 * ```javascript
 * const fn = (a, b) => a + b;
 * const ret = await timeoutThrow(1e3, fn, 1, 2);
 * console.log(ret); // 3
 * ```
 */
export default async function timeoutThrow<
    A extends readonly unknown[],
    R = any
>(duration: number, fn: (...args: A) => R, ...args: A): Promise<R> {
    if (!isUint(duration)) {
        throw new TypeError(
            `[timeoutThrow]: duration不是一个有效的超时毫秒数: "${duration}"`
        );
    }

    try {
        return Promise.race([Promise.resolve(fn(...args)), delayFn(duration)]);
    } catch (error) {
        throw error;
    }
}
