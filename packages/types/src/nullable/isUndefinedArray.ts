import isArrayFilled from '../array/isArrayFilled';

import isUndefined from './isUndefined';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是 `undefined`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUndefinedArray(value: unknown): value is undefined[] {
    return isArrayFilled(value) && value.every(isUndefined);
}
