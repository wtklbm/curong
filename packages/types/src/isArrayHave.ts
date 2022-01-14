import isArray from './isArray';

/**
 * 是不是一个长度大于 `0` 的数组
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrayHave<T extends any[]>(
    value: unknown
): value is T {
    return isArray(value) && value.length > 0;
}
