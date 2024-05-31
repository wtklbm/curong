/**
 * 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
 *
 * `isFinite` 方法在判断时会先将 `value` 隐式转换为 `Number` (`Number(value)`)。
 * 该方法与全局的 `isFinite` 最大的区别就是在尝试进行隐式转换时，如果当前值转换失败，全局的 `isFinite` 方法会抛出异常；
 * 而此方法不会抛出异常，而是直接返回一个布尔值。例如 `isFinite(0n)`，全局的 `isFinite` 会抛出
 * `Uncaught TypeError: Cannot convert a BigInt value to a number` 错误；而此方法会直接返回 `false`。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function (value: unknown): boolean {
    try {
        return isFinite(value as any);
    } catch {}

    return false;
}
