/**
 * 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
 *
 * @param value 要验证的值
 * @param isImplicit 是否进行隐式转换，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * ### 全局的 `isFinite`
 *
 * 全局的 `isFinite` 方法可以判断任意类型的值，并存在类型隐式转换的行为。它会将 `value` 隐式转换为 `Number` (`Number(value)`)。
 *
 * 该方法与全局的 `isFinite` 最大的区别就是在尝试进行隐式转换时，如果当前值转换失败，全局的 `isFinite` 方法会抛出异常；
 * 而此方法不会抛出异常，而是直接返回一个布尔值。例如 `isFinite(0n)`，全局的 `isFinite` 会抛出
 * `Uncaught TypeError: Cannot convert a BigInt value to a number` 错误；而此方法会直接返回 `false`。
 *
 * ### `Number.isFinite`
 *
 * `Number.isFinite` 方法在进行判断时，并不会对 `value` 进行隐式转换 (`Number(value)`)。
 * 如果 `value` 不是一个数字，则直接返回 `false`。该方法其实也可以用来判断字符串，写成 `isFinite(+value)` 即可。
 * 如果是判断其他值，则可以写成 `isFinite(Number(value))`。
 *
 */
export default function _<T extends unknown = number>(
    value: unknown,
    isImplicit: boolean = false
): value is T {
    try {
        return (isImplicit ? isFinite : Number.isFinite)(value as any);
    } catch {}

    return false;
}
