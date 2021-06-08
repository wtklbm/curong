import isString from './isString';

/**
 * 是不是一个经过 `trim` 后长度大于 `0` 的字符串
 *
 * @param value 要验证的值
 * @param length 当字符串被 `trim` 之后，剩余的长度要大于 `length` 才返回 `true`，默认 `length` 为 0
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringTrim(
    value: any,
    length: number = 0
): value is string {
    return isString(value) && value.trim().length > length;
}
