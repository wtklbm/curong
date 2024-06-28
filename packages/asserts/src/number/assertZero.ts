import { isZero } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是 `0`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertZero(
    value: unknown,
    variableName: string
): asserts value is 0 {
    return typeGuard(value, variableName, isZero);
}
