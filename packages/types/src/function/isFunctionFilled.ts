import isFunction from './isFunction';
import type { Function } from './types';

/**
 * 是不是一个参数个数大于 `0` 的函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isFunction(value) && value.length > 0;
}
