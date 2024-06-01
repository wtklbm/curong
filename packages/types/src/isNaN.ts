/**
 * 是不是一个 `NaN`
 *
 * @param value 要验证的值
 * @param isImplicit 是否进行隐式转换，默认为 `false`
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
 * console.log(isNaN(NaN)); // true
 * console.log(isNaN(NaN, true)); // true
 * console.log(isNaN('中')); // false
 * console.log(isNaN('中', true)); // true
 * ```
 *
 * @note
 *
 * - `NaN` 是 `Not a Number` 的缩写，他是一个特殊的 `number` 值
 * - `NaN` 的默认值等于 `Number.NaN`
 * - `NaN` 是唯一一个与自身不相等的特殊值，所以不能用 `==` 或 `===` 来进行判断，而应该使用 `isNaN` 方法
 * - `NaN` 和任何值相加都等于 `NaN`
 *
 * ### 返回 `NaN` 的五种情况
 *
 * 1. 失败的数字转换 (例如，显式转换，如 `parseInt("xxx")`、`Number(undefined)`，或隐式转换，如 `Math.abs(undefined)`)
 * 2. 计算结果不是实数的数学运算 (例如，`Math.sqrt(-1)`、`0 / 0`)
 * 3. 不定式 (例如，`0 * Infinity`、`1 ** Infinity`、`Infinity / Infinity`、`Infinity - Infinity`)
 * 4. 一个操作数被强制转换为 `NaN` 的方法或表达式 (例如，`7 ** NaN`、`7 * "xxx"`)——这意味着 `NaN` 具有传染性
 * 5. 将无效值表示为数字的其他情况 (例如，无效的 [Date] `new Date("xxx").getTime()`、`"".charCodeAt(1)`)
 *
 * ### 隐式类型转换
 *
 * `isNaN` 方法可以判断任意的值，并存在类型隐式转换的行为，它会将 `value` 隐式转换为 `Number` (`Number(value)`)。
 * 比如 `isNaN({})` 返回的值为 `true`。而 `Number.isNaN` 方法不存在类型隐式转换的行为。
 *
 * 该方法与全局的 `isNaN` 最大的区别就是在尝试进行隐式转换时，如果当前值转换失败，全局的 `isNaN` 方法会抛出异常；
 * 而此方法不会抛出异常，而是直接返回一个布尔值。例如 `isNaN(0n)`，全局的 `isNaN` 会抛出
 * `Uncaught TypeError: Cannot convert a BigInt value to a number` 错误；而此方法会直接返回 `false`。
 */
export default function _<T extends unknown = number>(
    value: unknown,
    isImplicit: boolean = false
): value is T {
    try {
        return (isImplicit ? isNaN : Number.isNaN)(value as any);
    } catch {}

    return false;
}
