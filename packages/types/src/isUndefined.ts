/**
 * 是不是 `undefined`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}
