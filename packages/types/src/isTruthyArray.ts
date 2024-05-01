import isArray from './isArray';
import isTruthy from './isTruthy';

import { type Truthy } from './types';

/**
 * 是不是一个数组，且每一项的值都是非虚值 (强制转换为 `Boolean` 后为 `true` 的值)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTruthyArray<T>(value: unknown): value is Truthy<T>[] {
    return isArray(value) && value.every(isTruthy);
}
