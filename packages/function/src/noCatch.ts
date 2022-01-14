/**
 * 获取函数返回的值，并忽略抛出的错误
 *
 * @param fn 要执行的函数 (包括同步函数和异步函数)
 * @returns 返回函数的执行结果
 * @example
 *
 * ```javascript
 * const fn = () => new Promise(r => setTimeout(() => r('完成了'), 1e3));
 * const ret = await noCatch(fn);
 * console.log(ret); // 完成了
 * ```
 */
export default async function noCatch<T = any>(
    fn: (...args: any[]) => Promise<T> | T,
    ...args: any[]
): Promise<void | T> {
    try {
        return Promise.resolve(fn(...args)).catch(() => {});
    } catch (_) {}
}
