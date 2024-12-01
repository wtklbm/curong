import { isIterable } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个同步或异步的可迭代的对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertIterable<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is Iterable<T> | AsyncIterable<T> {
    return typeGuard(
        { [variableName]: value },
        '不是一个同步或异步的可迭代的对象',
        isIterable
    );
}
