import isArrayHave from '../array/isArrayHave';

import isNullOrUndefined from './isNullOrUndefined';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null` 或 `undefined`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNullOrUndefinedArray(
    value: unknown
): value is Array<null | undefined> {
    return isArrayHave(value) && value.every(isNullOrUndefined);
}
