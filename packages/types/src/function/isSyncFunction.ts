import { getTag } from '../type';

import { asyncPattern } from './constants';
import isFunction from './isFunction';
import type { Function } from './types';

/**
 * 是不是一个同步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncFunction<T = unknown>(
    value: unknown
): value is Function<T> {
    return isFunction(value) && !asyncPattern.test(getTag(value) ?? '');
}
