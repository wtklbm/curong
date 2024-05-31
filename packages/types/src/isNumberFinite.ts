/**
 * 是不是一个不是 `Infinity`、`-Infinity` 或 `NaN` 的有限数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberFinite(value: unknown): boolean {
    return Number.isFinite(value);
}
