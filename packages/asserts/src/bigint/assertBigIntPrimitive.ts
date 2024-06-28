import { isBigIntPrimitive } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个基本的大数，即 `bigint`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBigIntPrimitive(
    value: unknown,
    variableName: string
): asserts value is bigint {
    return typeGuard(value, variableName, isBigIntPrimitive);
}
