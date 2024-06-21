import typeofEqual from '../type/typeofEqual';
import type { Function } from './types';

/**
 * 是不是一个函数 (包含同步函数、异步函数、`Generator` 函数 ...)
 *
 * 该函数可以验证任何类型的函数，只要 `typeof value` 为 `function` 就会返回 `true`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFunction<T = unknown>(
    value: unknown
): value is Function<T> {
    return typeofEqual(value, 'function');
}
