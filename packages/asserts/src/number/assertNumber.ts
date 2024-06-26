import { isNumber } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个数字或被包装后的数字对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param isAllowNaN 当值为 `NaN` 时是否返回 `true`，默认为 `false`
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 包含以下的值：
 *  - {@link NaN} 不是数字的值，`NaN` 不等于任何值，包括其自身
 *  - {@link Infinity} 无穷大
 *  - {@link Number.POSITIVE_INFINITY} 正无穷大
 *  - {@link Number.NEGATIVE_INFINITY} 负无穷大
 *  - {@link Number.MAX_VALUE} 最大正数，`MAX_VALUE` 为 `1.7976931348623157e308` (`(2**53 - 1) * (2**971)`)。大于 `MAX_VALUE` 的值代表 `Infinity`。
 *       因为精度原因，`MAX_VALUE + 1` 并不等于 `Infinity`。
 *  - {@link Number.MIN_VALUE} 最小正数，`MIN_VALUE` 为 `5e-324` (`2**(-1074)`)，是最接近 `0` 的正值，而不是最小的负值。
 *       小于 `MIN_VALUE` 的值将会转换为 `0`。
 *  - {@link Number.MAX_SAFE_INTEGER} 最大安全范围的值
 *  - {@link Number.MIN_SAFE_INTEGER} 最小安全范围的值
 *  - {@link Number.EPSILON}  1 与大于 1 的最小值之间的差
 */
export default function assertNumber(
    value: unknown,
    variableName: string,
    isAllowNaN: boolean = false
): asserts value is number {
    return typeGuard(value, variableName, isNumber, isAllowNaN);
}
