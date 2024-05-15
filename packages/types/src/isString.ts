import isStringObject from './isStringObject';
import isStringPrimitive from './isStringPrimitive';

/**
 * 是不是一个字符串或被包装后的字符串对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isString(value: unknown): value is string {
    return isStringPrimitive(value) || isStringObject(value);
}
