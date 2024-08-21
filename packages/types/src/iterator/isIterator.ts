import isFunction from '../function/isFunction';

/**
 * 是不是一个 `Iterator`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 在这里，只要迭代器有 `next` 方法，则返回 `true`
 */
export default function isIterator<T = unknown, R = unknown, N = undefined>(
    value: unknown
): value is Iterator<T, R, N> {
    try {
        return isFunction((value as Iterator<T, R, N>).next);
    } catch {}

    return false;
}
