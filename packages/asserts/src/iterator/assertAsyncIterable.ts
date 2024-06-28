import { isAsyncIterable } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个异步可迭代的对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertAsyncIterable<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is AsyncIterable<T> {
    return typeGuard(value, variableName, isAsyncIterable);
}
