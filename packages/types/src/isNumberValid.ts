import isUndefined from './isUndefined';

/**
 * 是不是一个有效的数字字符串
 *
 * @param value 要验证的值
 * @param isSpace 是否将空字符串也认为是有效的，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * isNumberValid('0'); // true
 * isNumberValid(' 0 '); // true
 * ```
 */
export default function isNumberValid(
    value: unknown,
    isSpace: boolean = false
): boolean {
    return (
        !isUndefined(value) &&
        !isNaN(Number(value).valueOf()) &&
        (isSpace || `${value}`.trim() !== '')
    );
}
