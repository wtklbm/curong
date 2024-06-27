import isAsyncFunction from './isAsyncFunction';
import type { AsyncFunction } from './types';

/**
 * 是不是一个参数个数大于 `0` 的异步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is AsyncFunction<R, A> {
    return isAsyncFunction(value) && value.length > 0;
}
