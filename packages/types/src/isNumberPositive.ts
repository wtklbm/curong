/**
 * 是不是一个大于 `0` 且不是 `Infinity` 或 `NaN` 的正数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberPositive(value: unknown): value is number {
    return Number.isFinite(value) && (value as number) > 0;
}
