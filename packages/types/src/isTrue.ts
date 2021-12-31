/**
 * 是不是 `true`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTrue(value: unknown): value is true {
    return value === true;
}
