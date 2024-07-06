import { isPromise } from '@curong/types';

import mapCall from './constants/mapCall';

/**
 * 随时取消对 `Promise`、同步函数或异步函数的执行
 *
 * @param callable 一个 `Promise`、同步函数或异步函数
 * @param isThrow 是否在取消 `callable` 的执行后抛出一个错误，默认为 `false`
 * @returns 返回一个数组，数组的第一项是一个新的 `Promise`，第二项是中止新的 `Promise` 的函数
 * @example
 *
 * ```typescript
 * const fn = (a: number, b: string, bool: boolean) => {
 *     return new Promise(resolve => {
 *         let timer = setTimeout(() => {
 *             clearTimeout(timer);
 *             timer = null;
 *             resolve(a + +b * 2 - +bool);
 *         }, 3e3);
 *     });
 * };
 *
 * const [promise, abort] = cancelExec(fn(1, '2', false));
 *
 * promise.then(
 *     data => console.log(data),
 *     err => console.log(err) // 在这里打印 "超过 2s 了"
 * );
 *
 * setTimeout(() => {
 *     abort('超过 2s 了');
 * }, 2e3);
 * ```
 */
export default function cancelExec<T = unknown>(
    callable: (() => Promise<T>) | (() => T) | Promise<T>,
    isThrow: boolean = false
): [Promise<T>, (payload?: unknown) => void] {
    let abort: (payload?: unknown) => void;

    return [
        Promise.race([
            isPromise(callable)
                ? callable
                : Promise.resolve(mapCall(callable)),
            new Promise(
                (resolve, reject) =>
                    (abort = payload => {
                        payload = mapCall(payload);
                        return isThrow ? reject(payload) : resolve(payload);
                    })
            )
        ]) as Promise<T>,
        abort!
    ];
}
