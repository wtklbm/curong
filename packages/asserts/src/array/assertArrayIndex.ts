import { isArrayIndex } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的正整数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertArrayIndex(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isArrayIndex);
}
