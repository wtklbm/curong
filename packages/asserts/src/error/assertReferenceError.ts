import { isReferenceError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `ReferenceError` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertReferenceError(
    value: unknown,
    variableName: string
): asserts value is ReferenceError {
    return typeGuard(value, variableName, isReferenceError);
}
