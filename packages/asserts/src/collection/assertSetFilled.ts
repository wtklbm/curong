import { isSetFilled } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的 `Set`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSetFilled<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is Set<T> {
    return typeGuard(value, variableName, isSetFilled);
}
