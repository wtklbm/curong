import { isInt8Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Int8Array`，每一项占一个字节，值为 `-2^7 - 2^7-1` ，即 `-128 - 127`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt8Array(
    value: unknown,
    variableName: string
): asserts value is Int8Array {
    return typeGuard(value, variableName, isInt8Array);
}
