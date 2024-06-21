import getTagEqual from '../type/getTagEqual';
import typeofEqual from '../type/typeofEqual';

/**
 * 是不是一个被包装后的字符串对象，即 `new String()` || `Object('')`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringObject(value: unknown): value is String {
    return typeofEqual(value, 'object') && getTagEqual(value, 'String');
}
