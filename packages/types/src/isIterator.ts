import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';

/**
 * 是不是一个 `Iterator`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 在这里，只要迭代器有 `next` 方法，则返回 `true`
 */
export default function isIterator<T = unknown, R = unknown, N = undefined>(
    value: any
): value is Iterator<T, R, N> {
    return !isNullOrUndefined(value) && isFunction(value.next);
}
