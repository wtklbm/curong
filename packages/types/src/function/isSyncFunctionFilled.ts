import isSyncFunction from './isSyncFunction';
import type { Function } from './types';

/**
 * 是不是一个参数个数大于 `0` 的同步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isSyncFunction(value) && value.length > 0;
}
