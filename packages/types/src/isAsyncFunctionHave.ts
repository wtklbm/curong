import isAsyncFunction, { AsyncFunction } from './isAsyncFunction';

/**
 * 是不是一个参数个数大于 `0` 的异步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncFunctionHave<T = unknown>(
    value: unknown
): value is AsyncFunction<T> {
    return isAsyncFunction(value) && value.length > 0;
}
