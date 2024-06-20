import isInt from './isInt';

/**
 * 是不是一个偶数，即取模后等于 `0` 的整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数，但 `NaN` 和正负 `Infinity` 不是整数
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isIntEven(value: unknown): value is number {
    return isInt(value) && Math.abs(value % 2) === 0;
}
