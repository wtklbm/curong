/**
 * 是不是一个可以安全计算的数字
 *
 * - 该方法是 `Number.isFinite` 的别名
 * - 只要 `value` 的值不能是 `Infinity`、`-Infinity` 或 `NaN` 即可
 * - 如果想知道是否为安全的整数，请使用 `isIntSafe` 方法
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberSafe(value: unknown): value is number {
    return Number.isFinite(value);
}
