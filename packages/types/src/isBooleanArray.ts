import isArray from './isArray';
import isBoolean from './isBoolean';

/**
 * 是不是一个数组，且每一项的值都是布尔值或被包装后的布尔值对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBooleanArray(value: unknown): value is boolean[] {
    return isArray(value) && value.every(isBoolean);
}
