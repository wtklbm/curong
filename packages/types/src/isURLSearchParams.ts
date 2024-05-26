import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `URLSearchParams`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUrlSearchParams(
    value: unknown
): value is URLSearchParams {
    return getTagEqual(value, 'URLSearchParams');
}
