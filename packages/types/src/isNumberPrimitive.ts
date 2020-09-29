/**
 * 是不是一个基本的数字，即 `number`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberPrimitive(value: any): value is number {
    return typeof value === 'number';
}
