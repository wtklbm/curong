import { isInt8 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个 `int8`，取值范围为 `-2^7 - 2^7-1` 的整数，即 `-128 - 127`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt8(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isInt8);
}
