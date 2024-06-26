import { isAsyncGenerator } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个异步的 `Generator`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertAsyncGenerator<
    T = unknown,
    R = unknown,
    N = unknown
>(
    value: unknown,
    variableName: string
): asserts value is AsyncGenerator<T, R, N> {
    return typeGuard(value, variableName, isAsyncGenerator);
}
