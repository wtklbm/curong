import { isFloat32 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个单精度浮点数，取值在 `-3.4028234663852886e38 - 3.4028234663852886e38` 之间的浮点数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFloat32(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isFloat32);
}
