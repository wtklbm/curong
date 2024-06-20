import { isFunction, isPromise } from '@curong/types';

/**
 * 执行一个函数，并获取函数的返回值，如果函数的执行时间超过 `duration` 时，就执行回调函数
 *
 * @param duration 一个以毫秒为单位的超时时间
 *  - 如果 `duration` 为小于或等于 `0` 的数字，则表示定时器应尽快执行
 *  - 如果 `duration` 为一个大于 `0` 的数字，则表示至少应等待 `duration` 毫秒后执行
 * @param callable 一个 `Promise`、同步函数或异步函数
 * @param returnable 当超时时，要返回的一个值，或一个可执行的回调函数
 * @param isThrow 是否在超时时把回调的结果以错误的形式抛出，默认为 `false`
 * @returns 如果函数执行的时间没有超时，则返回该结果，否则返回回调函数的结果
 * @example
 *
 * ```javascript
 * const fn = (a, b) => a + b;
 * const ret = await timeoutCallback(1e3, fn(1, 2), 0);
 * console.log(ret); // 3
 * ```
 */
export default function timeoutCallback<T = unknown>(
    duration: number,
    callable: (() => Promise<T>) | (() => T) | Promise<T>,
    returnable: (() => T) | T,
    isThrow: boolean = false
): Promise<T> {
    return Promise.race([
        isPromise(callable)
            ? callable
            : Promise.resolve(isFunction(callable) ? callable() : callable),
        new Promise((resolve, reject) => {
            let timer: any = setTimeout(() => {
                clearTimeout(timer);
                timer = null;

                try {
                    if (isFunction(returnable)) {
                        returnable = returnable();
                    }

                    return isThrow ? reject(returnable) : resolve(returnable);
                } catch (e) {
                    reject(e);
                }
            }, duration);
        })
    ]) as Promise<T>;
}
