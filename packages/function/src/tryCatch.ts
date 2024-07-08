/**
 * `try...catch...` 语法的 `Promise` 包装
 *
 * @param fn 要执行的函数 (包括同步函数和异步函数)
 * @param args 传递给 `fn` 的参数
 * @returns 返回函数执行的结果
 * @example ````
 *
 * ### 正常情况
 *
 * ```typescript
 * const ret = await tryCatch(async () => Promise.resolve(10));
 * console.log(ret); // 10
 * ```
 *
 * ### 异常处理
 *
 * ```typescript
 * await tryCatch(async () => Promise.reject(10)).catch(e => {
 *     console.log(e); // 10
 * });
 * ```
 */
export default async function tryCatch<R, A extends unknown[]>(
    fn: (...args: A) => Promise<R> | R,
    ...args: A
): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        try {
            return resolve(fn.apply(fn, args));
        } catch (e) {
            return reject(e);
        }
    });
}
