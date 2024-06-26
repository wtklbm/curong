import { isFloat32SafeInt } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个可以被单精度浮点数所能存储的整数，即 `2^24-1`，取值范围为 `-16777215 - 16777215`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFloat32SafeInt(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isFloat32SafeInt);
}
