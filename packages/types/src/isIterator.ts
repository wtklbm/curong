import isFunction from './isFunction';

/**
 * 是不是一个 `Iterator`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 在这里，只要迭代器有 `next` 方法，则返回 `true`
 */
export default function isIterator<T = any, R = any, N = undefined>(
    value: any
): value is Iterator<T, R, N> {
    return value && isFunction(value.next);
}
