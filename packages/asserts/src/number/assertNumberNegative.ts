import { isNumberNegative } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个小于 `0` 且不是 `-Infinity` 或 `NaN` 的负数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - 该数是一个可表示的安全的负数，即小于等于 `-Number.MIN_VALUE` 且大于等于 `-Number.MAX_VALUE` 的数
 * - `-Number.MAX_VALUE` 的值为 `-1.7976931348623157e308` (`-((2**53 - 1) * (2**971))`)，小于 `-MAX_VALUE` 的值表示为 `-Infinity` 并将丢失其实际值
 * - `-Number.MIN_VALUE` 的值为 `-5e-324` (`-(2**(-1074))`)，是可表示的最大负数 (一个接近于 `0` 的很大的负数)。大于 `-MIN_VALUE` 的值将转换为 `0`
 */
export default function assertNumberNegative(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isNumberNegative);
}
