import isFinite from './isFinite';

/**
 * 是不是一个大于 `0` 且不是 `Infinity` 或 `NaN` 的正数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - 该数是一个可表示的安全的正数，即大于等于 `Number.MIN_VALUE` 且小于等于 `Number.MAX_VALUE` 的数
 * - `Number.MAX_VALUE` 的值为 `1.7976931348623157e308` (`(2^53 - 1) * (2^971)`)，大于 `MAX_VALUE` 的值表示为 `Infinity` 并将丢失其实际值
 * - `Number.MIN_VALUE` 的值为 `5e-324` (`2^(-1074)`)，是可表示的最小正数 (一个接近于 `0` 的很小的正数)。小于 `MIN_VALUE` 的值将转换为 `0`
 */
export default function isNumberPositive(value: unknown): value is number {
    return isFinite(value) && value > 0;
}
