/**
 * 是不是一个 `Infinity`，即正无穷大的数
 *
 * `Infinity` 等价于  `Number.POSITIVE_INFINITY`，是超出 `1.7976931348623157E+103088` 的数。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInfinityPositive(value: unknown): value is number {
    return value === Infinity;
}
