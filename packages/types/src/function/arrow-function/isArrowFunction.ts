import isFunction from '../function/isFunction';
import { Function } from '../types';

import isArrowFunctionCore from './constants/isArrowFunctionCore';

/**
 * 是不是一个箭头函数 (包含同步箭头函数、异步箭头函数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrowFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isFunction(value) && isArrowFunctionCore(value);
}
