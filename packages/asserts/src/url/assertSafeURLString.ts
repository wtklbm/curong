import { isSafeURLString } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个安全的 `URL` 字符串，即长度小于或等于 `2000`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSafeURLString(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(value, variableName, isSafeURLString);
}