import isFunction from '../function/isFunction';

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
    try {
        return isFunction((value as AsyncIterable<T>)[Symbol.asyncIterator]);
    } catch {}

    return false;
}
