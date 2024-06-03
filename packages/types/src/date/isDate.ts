import { getTagEqual } from '..';

/**
 * 是不是一个 `Date`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDate(value: unknown): value is Date {
    return getTagEqual(value, 'Date');
}
