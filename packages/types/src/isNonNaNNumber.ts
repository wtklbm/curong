import isNumber from './isNumber';

/**
 * 是不是一个不是 `NaN` 的数字
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNonNaNNumber(value: unknown): value is number {
    return isNumber(value) && !Number.isNaN(value);
}
