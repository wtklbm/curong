import { isInt } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数。但不包含 {@link NaN} 和正负 {@link Infinity}
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard({ [variableName]: value }, '不是一个整数', isInt);
}
