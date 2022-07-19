import isNumber from './isnumber';
import isString from './isString';
import isSymbol from './isSymbol';

/**
 * 是不是一个可以作为属性的值
 *
 * 可以作为属性的值包括：字符串 (包括空字符串)、数字 (包含任意的正数和负数、`NaN`、`Infinity` 等) 和 `symbol`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPropertyKey(value: unknown): value is PropertyKey {
    return isString(value) || isNumber(value) || isSymbol(value);
}
