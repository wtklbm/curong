import { isUint16Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Uint16Array`，每一项占两个字节，值为 `0 - 2^16-1`，即 `0 - 65535`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertUint16Array(
    value: unknown,
    variableName: string
): asserts value is Uint16Array {
    return typeGuard(value, variableName, isUint16Array);
}
