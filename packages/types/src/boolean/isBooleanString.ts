import isFalseString from './isFalseString';
import isTrueString from './isTrueString';

/**
 * 是不是一个布尔值字符串，即字符串 `true` 或 `false`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBooleanString(
    value: unknown
): value is 'true' | 'false' {
    return isTrueString(value) || isFalseString(value);
}
