import { isRangeError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `RangeError` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertRangeError(
    value: unknown,
    variableName: string
): asserts value is RangeError {
    return typeGuard(value, variableName, isRangeError);
}
