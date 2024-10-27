import { Function } from '../types';

import isSyncArrowFunction from './isSyncArrowFunction';

/**
 * 是不是一个参数个数大于 `0` 的同步箭头函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncArrowFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isSyncArrowFunction(value) && value.length > 0;
}
