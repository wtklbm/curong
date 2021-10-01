/**
 * 是不是一个数组
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @polyfill
 * ```javascript
 * if (!Array.isArray) {
 *   Array.isArray = function(arg) {
 *     return Object.prototype.toString.call(arg) === '[object Array]';
 *   };
 * }
 * ```
 */
export default function isArray(value: any): value is Array<any> {
    // Note: 数组/类数组、字符串、函数、对象、`Window`、`Buffer`/`ArrayBuffer` 等都有 `length` 属性
    return Array.isArray(value);
}
