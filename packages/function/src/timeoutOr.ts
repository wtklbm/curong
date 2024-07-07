import fCall from './constants/fCall';
import pWarper from './constants/pWarper';
import setTimeout from './setTimeout';

/**
 * 执行一个函数，并获取函数的返回值，如果函数的执行时间超过 `duration` 时，就执行回调函数
 *
 * @param duration 一个以毫秒为单位的超时时间，它是一个大于或等于 `0` 的整数
 * @param callable 一个 `Promise`、同步函数或异步函数
 * @param callback 当超时时，要返回的一个值、`Promise` 或一个可执行的回调函数
 * @returns 如果函数执行的时间没有超时，则返回该结果，否则返回回调函数的结果
 * @example
 *
 * ```typescript
 * const fn = (a, b) => a + b;
 * const ret = await timeoutOr(1e3, fn, 0, 1, 2);
 * console.log(ret); // 3
 * ```
 */
export default async function timeoutOr<A extends unknown[], R>(
    duration: number,
    callable: ((...args: A) => any) | Promise<any>,
    callback?:
        | (<E extends Error, T>(error: E, ...args: A) => T | Promise<T>)
        | Promise<any>
        | R
        | null
        | undefined,
    ...args: A
) {
    let timer;
    const ret = await Promise.race([
        pWarper(callable, args),
        new Promise<R>((resolve, reject) => {
            timer = setTimeout(() => {
                try {
                    resolve(fCall(callback, args));
                } catch (e) {
                    reject(e);
                }
            }, duration);
        })
    ]);
    clearTimeout(timer);
    return ret;
}
