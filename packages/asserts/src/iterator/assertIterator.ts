import { isIterator } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Iterator`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note 在这里，只要迭代器有 `next` 方法，则返回 `true`
 */
export default function assertIterator<T = unknown, R = unknown, N = undefined>(
    value: unknown,
    variableName: string
): asserts value is Iterator<T, R, N> {
    return typeGuard(
        { [variableName]: value },
        '不是一个 Iterator',
        isIterator
    );
}
