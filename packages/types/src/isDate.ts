import getTag from './getTag';

/**
 * 是不是一个有效的 `Date`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDate(value: any): value is Date {
    return getTag(value) === 'Date';
}
