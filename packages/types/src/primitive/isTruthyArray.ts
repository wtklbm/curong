import isArrayFilled from '../array/isArrayFilled';

import isTruthy from './isTruthy';
import type { Truthy } from './types';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是真值 (强制转换为 `Boolean` 后为 `true` 的值)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTruthyArray<T>(value: unknown): value is Truthy<T>[] {
    return isArrayFilled(value) && value.every(isTruthy);
}
