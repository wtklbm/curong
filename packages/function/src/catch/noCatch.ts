import executeToPromise from '../promise/executeToPromise';

/**
 * 获取函数返回的值，并忽略抛出的错误
 *
 * @param fn 要执行的函数。可以是 `Promise`、同步函数或异步函数
 * @param args 传递给 `fn` 的参数
 * @returns 返回函数的执行结果
 * @example
 *
 * ```typescript
 * const fn = () => new Promise(r => setTimeout(() => r('完成了'), 1e3));
 * const ret = await noCatch(fn);
 * console.log(ret); // 完成了
 * ```
 */
export default async function noCatch<R, A extends unknown[]>(
    fn: ((...args: A) => Promise<R> | R) | Promise<R>,
    ...args: A
): Promise<R | void> {
    return executeToPromise(fn, args).catch(() => {});
}
