import { isFalseString } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是 `false` 字符串
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFalseString(
    value: unknown,
    variableName: string
): asserts value is 'false' {
    return typeGuard(value, variableName, isFalseString);
}
