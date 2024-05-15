import isArray from './isArray';
import isNull from './isNull';

/**
 * 是不是一个数组，且每一项的值都是 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNullArray(value: unknown): value is null[] {
    return isArray(value) && value.every(isNull);
}
