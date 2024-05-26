import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Map`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * # 强引用
 *
 * `Map` 使用的是强引用，当 `Map` 中引用的变量重新赋值时，`Map` 中的引用并不会被销毁。
 *
 * ```javascript
 * let o = { name: 'wtklbm' };
 * const map = new Map([[o, o.name]]);
 *
 * // 虽然 `o` 的引用已经改为了 `null`，但是因为 `map` 依然引用着 `{ name: 'wtklbm' }`，
 * // 所以 `{ name: 'wtklbm' }` 所占用的内存并不会被销毁。
 * o = null;
 * ```
 */
export default function isMap<K = unknown, V = unknown>(
    value: unknown
): value is Map<K, V> {
    return getTagEqual(value, 'Map');
}
