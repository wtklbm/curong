import isInt from './isInt';

/**
 * 是不是一个奇数，即取模后等于 `1` 的整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数，但  {@link NaN} 和正负 {@link Infinity} 不是整数
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isIntOdd(value: unknown): value is number {
    return isInt(value) && Math.abs(value % 2) === 1;
}
