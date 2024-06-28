import { isIntOdd } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个奇数，即取模后等于 `1` 的整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数，但  {@link NaN} 和正负 {@link Infinity} 不是整数
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertIntOdd(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isIntOdd);
}
