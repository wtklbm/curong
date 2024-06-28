import { isStringObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个被包装后的字符串对象，即 `new String()` || `Object('')`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertStringObject(
    value: unknown,
    variableName: string
): asserts value is String {
    return typeGuard(value, variableName, isStringObject);
}
