/**
 * 是不是一个 `NaN`
 *
 * `NaN` 是唯一一个与自身不相等的特殊值，所以不能用 `==` 或 `===` 来进行判断，而应该使用 `isNaN` 方法。
 *
 * `isNaN` 方法可以判断任意的值，并存在类型隐式转换的行为，它会将 `value` 隐式转换为 `Number` (`Number(value)`)。比如 `isNaN({})` 返回的值为 `true`。
 * 该方法与全局的 `isNaN` 最大的区别就是在尝试进行隐式转换时，如果当前值转换失败，全局的 `isNaN` 方法会抛出异常；
 * 而此方法不会抛出异常，而是直接返回一个布尔值。例如 `isNaN(0n)`，全局的 `isNaN` 会抛出
 * `Uncaught TypeError: Cannot convert a BigInt value to a number` 错误；而此方法会直接返回 `false`。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @example
 *
 * ```JavaScript
 * console.log(isNaN(NaN)); // true
 * console.log(isNaN('中')); // true
 * ```
 */
export default function (value: unknown): boolean {
    try {
        return isNaN(value as any);
    } catch {}

    return false;
}
