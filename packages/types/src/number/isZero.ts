/**
 * 是不是 `0`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isZero(value: unknown): value is 0 {
    return value === 0;
}
