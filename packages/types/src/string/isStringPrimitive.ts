import typeofEqual from '../type/typeofEqual';

/**
 * 是不是一个基本的字符串，即 `string` || `String()`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringPrimitive(value: unknown): value is string {
    return typeofEqual(value, 'string');
}
