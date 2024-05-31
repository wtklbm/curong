/**
 * 是不是一个 `NaN`
 *
 * `NaN` 是唯一一个与自身不相等的特殊值，所以不能用 `==` 或 `===` 来进行判断，而应该使用 `isNaN` 方法。
 *
 * 该方法在进行判断时，并不会对 `value` 进行隐式转换 (`Number(value)`)。如果 `value` 不是一个数字，则直接返回 `false`。
 * 该方法其实也可以用来判断字符串，写成 `isNumberNaN(+value)` 即可。如果是判断其他值，则可以写成 `isNumberNaN(Number(value))`。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @polyfill
 *
 * ``` javascript
 * Number.isNaN = Number.isNaN || function(value) {
 *   return typeof value === 'number' && value !== value;
 * }
 * ```
 *
 * @example
 *
 * ```JavaScript
 * console.log(isNumberNaN(NaN)); // true
 * console.log(isNumberNaN('中')); // false
 * ```
 */
export default function isNumberNaN(value: unknown): value is number {
    return Number.isNaN(value);
}
