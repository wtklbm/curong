import { isBoolean } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个布尔值或被包装后的布尔值对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBoolean(
    value: unknown,
    variableName: string
): asserts value is boolean {
    return typeGuard(value, variableName, isBoolean);
}
