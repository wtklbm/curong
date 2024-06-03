import { isArrayHave } from '..';

import isNull from './isNull';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是 `null`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNullArray(value: unknown): value is null[] {
    return isArrayHave(value) && value.every(isNull);
}
