/**
 * 是不是一个 `isFormData`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFormData(value: unknown): value is FormData {
    return value instanceof FormData;
}
