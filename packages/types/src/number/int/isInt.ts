/**
 * 是不是一个整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数。但不包含 {@link NaN} 和正负 {@link Infinity}
 * @returns 是则返回 `true`，否则为 `false`。
 * @polyfill
 *
 * ``` javascript
 * Number.isInteger = Number.isInteger || function(value) {
 *     return typeof value === 'number' &&
 *       isFinite(value) &&
 *       Math.floor(value) === value;
 * };
 * ```
 *
 * @note
 *
 * 该方法是 {@link Number.isInteger} 的别名。
 *
 * 由于 `JavaScript` 是弱类型语言，所以数字 `1.0` 当做参数传递给函数后会变为 `1`，
 * 并且 `Number.isInteger(1.0)` 的值为 `true`，所以 `1.0` 也可以当做是数组的下标索引。
 */
export default function isInt(value: unknown): value is number {
    return Number.isInteger(value);
}
