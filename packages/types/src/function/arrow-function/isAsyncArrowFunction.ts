import isAsyncFunction from '../function/isAsyncFunction';
import { AsyncFunction } from '../types';

import isArrowFunctionCore from './constants/isArrowFunctionCore';

/**
 * 是不是一个异步箭头函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncArrowFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is AsyncFunction<R, A> {
    return isAsyncFunction(value) && isArrowFunctionCore(value);
}
