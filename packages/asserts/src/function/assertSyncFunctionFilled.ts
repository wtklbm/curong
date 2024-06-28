import { isSyncFunctionFilled, type Function } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个参数个数大于 `0` 的同步函数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSyncFunctionFilled<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown, variableName: string): asserts value is Function<R, A> {
    return typeGuard(value, variableName, isSyncFunctionFilled);
}
