/**
 * `try...catch...` 语法的 `Promise` 包装
 *
 * @param fn 要执行的操作
 * @returns 如果函数执行成功则将结果返回，否则抛出异常
 * @example
 *
 * ```javascript
 * const ret = await tryCatch(async () => Promise.resolve(10));
 * console.log(ret); // 10
 * ```
 */
export default function tryCatch(fn: any) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fn());
        } catch (e) {
            reject(e);
        }
    });
}
