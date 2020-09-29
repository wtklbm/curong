/**
 * 是不是 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNull(value: any): value is null {
    return value === null;
}
