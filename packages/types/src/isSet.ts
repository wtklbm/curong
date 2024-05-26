import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Set`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSet<T = unknown>(value: unknown): value is Set<T> {
    return getTagEqual(value, 'Set');
}
