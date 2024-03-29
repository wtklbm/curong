import getTag from './getTag';
import isFunction from './isFunction';

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
export default function isArray<T extends any[]>(value: unknown): value is T {
    // Note: 数组/类数组、字符串、函数、对象、`Window`、`Buffer`/`ArrayBuffer` 等都有 `length` 属性
    return (
        (isFunction(Array.isArray) && Array.isArray(value)) ||
        getTag(value) === 'Array'
    );
}
