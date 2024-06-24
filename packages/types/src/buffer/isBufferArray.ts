import isArrayFilled from '../array/isArrayFilled';

import isBuffer from './isBuffer';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是 `Buffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBufferArray(value: unknown): value is boolean[] {
    return isArrayFilled(value) && value.every(isBuffer);
}
