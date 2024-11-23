/**
 * 是不是 `false` 字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFalseString(value: unknown): value is 'false' {
    return value === 'false';
}
