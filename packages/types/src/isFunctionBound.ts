import isFunction from './isFunction';
import type { Function } from './types';

/**
 * 是不是一个经过 `.bind()` 所绑定过的函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFunctionBound<T = unknown>(
    value: unknown
): value is Function<T> {
    return (
        isFunction(value) &&
        !Object.prototype.hasOwnProperty.call(value, 'prototype')
    );
}
