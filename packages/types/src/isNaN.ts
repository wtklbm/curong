/**
 * 是不是一个 `NaN`
 *
 * `NaN` 是唯一一个与自身不相等的特殊值，所以不能用 `==` 或 `===` 来进行判断，而应该使用 `isNaN` 方法。
 *
 * 全局的 `isNaN` 方法可以判断任意的值，并存在类型隐式转换的行为，比如 `isNaN({})` 返回的值为 `true`。
 * 而 `Number.isNaN` 方法不存在类型隐式转换的行为。
 *
 * 该方法与全局的 `isNaN` 最大的区别就是在尝试进行隐式转换时，如果当前值转换失败，全局的 `isNaN` 方法会抛出异常；
 * 而此方法不会抛出异常，而是直接返回一个布尔值。例如 `isNaN(0n)`，全局的 `isNaN` 会抛出
 * `Uncaught TypeError: Cannot convert a BigInt value to a number` 错误；而此方法会直接返回 `false`。
 *
 * @param value 要验证的值
 * @param isImplicit 是否进行隐式转换，默认为 `true`
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
 * console.log(isNaN(NaN, false)); // true
 * console.log(isNaN('中')); // true
 * console.log(isNaN('中', false)); // false
 * ```
 */
export default function (value: unknown, isImplicit: boolean = true): boolean {
    try {
        return (isImplicit ? isNaN : Number.isNaN)(value as any);
    } catch {}

    return false;
}
