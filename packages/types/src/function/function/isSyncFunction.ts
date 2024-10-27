import { getTag } from '../../type';

import { asyncPattern } from '../constants';
import type { Function } from '../types';

import isFunction from './isFunction';

/**
 * 是不是一个同步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isFunction(value) && !asyncPattern.test(getTag(value));
}
