import { isString } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个字符串或被包装后的字符串对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertString(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(value, variableName, isString);
}
