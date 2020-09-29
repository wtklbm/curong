/**
 * 是不是 `false`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFalse(value: any): value is false {
    return value === false;
}
