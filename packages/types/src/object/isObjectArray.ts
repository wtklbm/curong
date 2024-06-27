import isArrayFilled from '../array/isArrayFilled';

import isObject from './isObject';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是标记为 `[object Object]` 的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isObjectArray<K extends PropertyKey, V = unknown>(
    value: unknown
): value is Record<K, V>[] {
    return isArrayFilled(value) && value.every(isObject);
}
