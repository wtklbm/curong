/**
 * 是不是一个基本的字符串，即 `string`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringPrimitive(value: any): value is string {
    return typeof value === 'string';
}
