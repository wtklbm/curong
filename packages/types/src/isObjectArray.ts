import isArrayHave from './isArrayHave';
import isObject from './isObject';
import type { Function } from './types';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是标记为 `[object Object]` 的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isObjectArray<T = unknown>(
    value: unknown
): value is Function<T>[] {
    return isArrayHave(value) && value.every(isObject);
}