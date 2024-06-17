import { isArrayHave } from '..';
import type { Function } from '../function';

import isTypeofObject from './isTypeofObject';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是对象 (通过 `typeof` 判断且不为 `null`)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTypeofObjectArray<T = unknown>(
    value: unknown
): value is Function<T>[] {
    return isArrayHave(value) && value.every(isTypeofObject);
}
