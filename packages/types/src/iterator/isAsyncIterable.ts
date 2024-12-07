import isFunction from '../function/function/isFunction';
import isNullOrUndefined from '../nullable/isNullOrUndefined';
import isSymbol from '../symbol/isSymbol';

import type { AsyncIterable } from './types';

/**
 * 是不是一个异步可迭代的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 更多内容，请参考 `isIterable` 方法的文档
 */
export default function isAsyncIterable<T = unknown>(
    value: unknown
): value is AsyncIterable<T> {
    const asyncIterator = Symbol?.asyncIterator;

    return (
        isSymbol(asyncIterator) &&
        !isNullOrUndefined(value) &&
        isFunction((value as any)[asyncIterator])
    );
}
