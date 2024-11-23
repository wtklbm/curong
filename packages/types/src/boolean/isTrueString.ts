/**
 * 是不是 `true` 字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTrueString(value: unknown): value is 'true' {
    return value === 'true';
}
