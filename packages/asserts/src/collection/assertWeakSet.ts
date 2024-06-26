import { isWeakSet } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `WeakSet`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWeakSet<T extends object = object>(
    value: unknown,
    variableName: string
): asserts value is WeakSet<T> {
    return typeGuard(value, variableName, isWeakSet);
}
