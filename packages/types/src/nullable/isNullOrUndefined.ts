/**
 * 是不是 `undefined` 或者 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNullOrUndefined(
    value: unknown
): value is null | undefined {
    return value == null;
}
