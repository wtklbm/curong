import { isBigIntFilled } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个大于 `0n` 的 `bigint` (大数)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *  - `BigInt` 和 `Number` 是不兼容的，不能相互赋值，也不能直接做加法运算
 */
export default function assertBigIntFilled(
    value: unknown,
    variableName: string
): asserts value is bigint {
    return typeGuard(value, variableName, isBigIntFilled);
}
