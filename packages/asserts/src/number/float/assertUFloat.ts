import { isUFloat } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个无符号浮点数，即大于 `0` 的浮点数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertUFloat(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isUFloat);
}
