import { isInt16Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Int16Array`，每一项占两个字节，值为 `-2^15 - 2^15-1`，即 `-32768 - 32767`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt16Array(
    value: unknown,
    variableName: string
): asserts value is Int16Array {
    return typeGuard(value, variableName, isInt16Array);
}
