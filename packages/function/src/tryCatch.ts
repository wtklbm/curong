/**
 * `try...catch...` 语法的 `Promise` 包装
 *
 * @param fn 要执行的函数 (包括同步函数和异步函数)
 * @returns 如果函数执行成功则将结果返回，否则抛出异常
 * @example
 *
 * ```javascript
 * const ret = await tryCatch(async () => Promise.resolve(10));
 * console.log(ret); // 10
 * ```
 */
export default function tryCatch<T = any>(
    fn: (...args: any[]) => Promise<T> | T,
    ...args: any[]
): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            resolve(fn(...args));
        } catch (e) {
            reject(e);
        }
    });
}
