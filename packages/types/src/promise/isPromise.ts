import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `Promise`
 *
 * `Promise` 可能是一个对象或者是一个函数，并且包含 `then` 方法。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @polyfill
 *
 * ```javascript
 * const isPromise = value => {
 *     return (
 *         ((typeof value === 'object' && value !== null) ||
 *             typeof value === 'function') &&
 *         typeof value.then === 'function'
 *     );
 * };
 * ```
 */
export default function isPromise<T = unknown>(
    value: unknown
): value is Promise<T> {
    return getTagEqual(value, 'Promise');
}
