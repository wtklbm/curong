import { isStringPrimitive } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个基本的字符串，即 `string` || `String()`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertStringPrimitive(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(value, variableName, isStringPrimitive);
}
