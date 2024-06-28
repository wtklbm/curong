import { isSyncGenerator } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个同步的 `Generator`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSyncGenerator<
    T = unknown,
    R = unknown,
    N = unknown
>(value: unknown, variableName: string): asserts value is Generator<T, R, N> {
    return typeGuard(value, variableName, isSyncGenerator);
}
