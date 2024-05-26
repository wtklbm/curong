import getTagEqual from './getTagEqual';

/**
 * 是不是一个同步的 `Generator`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncGenerator<T = unknown, R = unknown, N = unknown>(
    value: unknown
): value is Generator<T, R, N> {
    return getTagEqual(value, 'Generator');
}
