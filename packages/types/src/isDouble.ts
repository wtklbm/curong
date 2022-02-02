import isNumber from './isNumber';

/**
 * 是不是一个小于 `2^52 - 1` 的浮点数，即 `4503599627370496 - 1`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDouble(value: unknown): value is number {
    return isNumber(value) && isFinite(value) && Math.floor(value) !== value;
}
