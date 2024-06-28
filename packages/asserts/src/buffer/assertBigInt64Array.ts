import { isBigInt64Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `BigInt64Array`，每一项占八个字节，值为 `-2^63 - 2^63-1`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBigInt64Array(
    value: unknown,
    variableName: string
): asserts value is BigInt64Array {
    return typeGuard(value, variableName, isBigInt64Array);
}
