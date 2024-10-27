import isSyncFunction from '../function/isSyncFunction';
import { Function } from '../types';

import isArrowFunctionCore from './constants/isArrowFunctionCore';

/**
 * 是不是一个同步箭头函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncArrowFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isSyncFunction(value) && isArrowFunctionCore(value);
}
