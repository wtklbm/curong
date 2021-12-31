/**
 * 是不是一个基本的布尔值，即 `boolean`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBooleanPrimitive(value: unknown): value is boolean {
    return typeof value === 'boolean';
}
