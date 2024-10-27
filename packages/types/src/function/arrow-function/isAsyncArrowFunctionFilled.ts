import { AsyncFunction } from '../types';

import isAsyncArrowFunction from './isAsyncArrowFunction';

/**
 * 是不是一个参数个数大于 `0` 的异步箭头函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncArrowFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is AsyncFunction<R, A> {
    return isAsyncArrowFunction(value) && value.length > 0;
}
