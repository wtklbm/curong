import isUndefined from '../nullable/isUndefined';
import isString from '../string/isString';

import isNumber from './isNumber';

/**
 * 是不是一个可以转换为有效的数字的值
 *
 * @param value 要验证的值
 * @param isImplicit 在进行数字转换时，是否可以进行隐式转换。默认为 `true`。
 *  如果允许隐式转换，则布尔值、空字符串 (包括多个空格字符的字符串)、空数组、`null`、`BigInt`、`NaN` 等均可以转换为数字。
 *  否则，则只判断数字 (非 `BigInt`) 和数字字符串是否可以转换为有效的数字。
 * @param isAllowNaN 当 `isImplicit` 为 `false` 且 `value` 为 `NaN` 时是否返回 `true`。默认为 `false`
 * @param isAllowEmptyString 当 `isImplicit` 为 `false` 且 `value` 为经过 `trim` 后长度为 `0` 的空字符串时是否返回 `true`。默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`。
 *  因为 `Infinity` 和 `-Infinity` 是有效数字，所以在使用该方法时，可能还需要进行额外判断。
 *  例如在进行算术运算时，需要判断 `isNumberValid(value) && isFinite(value)`。
 * @example
 *
 * ```javascript
 * isNumberValid(' '); // true
 * isNumberValid(' ', false); // false
 * isNumberValid(' ', false, false, true); // true
 * ```
 */
export default function isNumberValid(
    value: unknown,
    isImplicit: boolean = true,
    isAllowNaN: boolean = false,
    isAllowEmptyString: boolean = false
): boolean {
    return (
        (isImplicit
            ? !isUndefined(value)
            : isNumber(value, isAllowNaN) ||
              (isString(value) &&
                  (isAllowEmptyString || value.trim() !== ''))) &&
        (isAllowNaN || !isNaN(Number(value).valueOf()))
    );
}
