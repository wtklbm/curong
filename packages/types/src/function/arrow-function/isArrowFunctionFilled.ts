import { Function } from '../types';

import isArrowFunction from './isArrowFunction';

/**
 * 是不是一个参数个数大于 `0` 的箭头函数 (包含同步箭头函数、异步箭头函数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrowFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown): value is Function<R, A> {
    return isArrowFunction(value) && value.length > 0;
}
