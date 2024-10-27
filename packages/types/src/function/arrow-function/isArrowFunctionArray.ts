import isArrayFilled from '../../array/isArrayFilled';

import type { Function } from '../types';

import isArrowFunction from './isArrowFunction';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是箭头函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrowFunctionArray<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A>[] {
    return isArrayFilled(value) && value.every(isArrowFunction);
}
