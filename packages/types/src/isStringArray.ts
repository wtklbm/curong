import isArray from './isArray';
import isString from './isString';

/**
 * 是不是一个数组，且每一项的值都是字符串或被包装后的字符串对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringArray(value: unknown): value is string[] {
    return isArray(value) && value.every(isString);
}
