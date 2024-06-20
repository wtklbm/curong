import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个数组
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @polyfill
 *
 * ```javascript
 * if (!Array.isArray) {
 *   Array.isArray = function(arg) {
 *     return Object.prototype.toString.call(arg) === '[object Array]';
 *   };
 * }
 * ```
 *
 * @note
 *
 * 该方法将首先尝试调用 `Array.isArray`，如果调用失败，则尝试通过 `Object.prototype.toString.call` 获取标签，判断是否等于 `[object Array]`。
 */
export default function isArray<T extends unknown[]>(
    value: unknown
): value is T {
    try {
        return Array.isArray(value);
    } catch {}

    return getTagEqual(value, 'Array');
}
