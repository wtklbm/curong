import { isInfinityNegative } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `-Infinity`，即负无穷大的数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `-Infinity` 等价于  `Number.NEGATIVE_INFINITY`，是超出 `-1.7976931348623157e308` 的数
 * - `Number.NEGATIVE_INFINITY` 是一个不可写、不可枚举、不可配置的值
 */
export default function assertInfinityNegative(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个 -Infinity，即负无穷大的数',
        isInfinityNegative
    );
}
