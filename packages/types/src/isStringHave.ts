import isString from './isString';

/**
 * 是不是一个长度大于 `0` 的字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringHave(value: any): value is string {
    return isString(value) && value.length > 0;
}
