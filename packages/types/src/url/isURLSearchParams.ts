import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `URLSearchParams`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isURLSearchParams(
    value: unknown
): value is URLSearchParams {
    return getTagEqual(value, 'URLSearchParams');
}
