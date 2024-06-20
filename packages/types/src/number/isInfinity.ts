import isInfinityNegative from './isInfinityNegative';
import isInfinityPositive from './isInfinityPositive';

/**
 * 是不是一个无穷大的数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - `Infinity`: 等价于  `Number.POSITIVE_INFINITY`，是超出 `1.7976931348623157e308` 的数值
 * - `-Infinity`: 等价于  `Number.NEGATIVE_INFINITY`，是超出 `-1.7976931348623157e308` 的数值
 */
export default function isInfinity(value: unknown): value is number {
    return isInfinityPositive(value) || isInfinityNegative(value);
}
