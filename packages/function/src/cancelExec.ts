import pWarper from './constants/pWarper';

type Payload<R, A extends unknown[]> =
    | ((...args: A) => Promise<R> | R)
    | Promise<R>
    | R
    | null
    | undefined;

/**
 * 随时取消对 `Promise`、同步函数或异步函数的执行
 *
 * @param callable 一个 `Promise`、同步函数或异步函数
 * @param args 传递给 `callable` 的参数
 * @returns 返回一个数组，数组的第一项是一个新的 `Promise`，第二项是中止新的 `Promise` 的 `abort` 函数
 * @example
 *
 * ```typescript
 * const fn = (a: number, b: string, bool: boolean) => {
 *     return new Promise(resolve => {
 *         setTimeout(() => resolve(a + +b * 2 - +bool), 100);
 *     });
 * };
 *
 * const [promise, abort] = cancelExec(fn, 1, '2', true);
 *
 * promise.then(
 *     data => console.log(data), // 0
 *     err => console.log(err)
 * );
 *
 * setTimeout(() => {
 *     abort(0);
 * }, 50);
 * ```
 */
export default function cancelExec<R, A extends unknown[]>(
    callable: ((...args: A) => Promise<R> | R) | Promise<R>,
    ...args: A
): [Promise<R>, (payload?: Payload<R, A>) => void] {
    let abort: (payload?: Payload<R, A>) => void;

    return [
        Promise.race([
            pWarper(callable),
            new Promise(resolve => {
                abort = payload => resolve(pWarper(payload, args));
            })
        ]),
        abort!
    ];
}
