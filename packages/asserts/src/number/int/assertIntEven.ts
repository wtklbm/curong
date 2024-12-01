import { isIntEven } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个偶数，即取模后等于 `0` 的整数
 *
 * @param value 要验证的值。包含正整数和负整数，也包括安全的整数和不安全的整数，但 `NaN` 和正负 `Infinity` 不是整数
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertIntEven(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个偶数，即取模后等于 0 的整数',
        isIntEven
    );
}
