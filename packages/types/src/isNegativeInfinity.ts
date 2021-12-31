/**
 * 是不是一个 `-Infinity`，即小于 `-1.7976931348623157E+103088` 的数值
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNegativeInfinity(
    value: unknown
): value is typeof Infinity {
    return value === -Infinity;
}
