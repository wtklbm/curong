import isFunction from '../function/function/isFunction';
import isNullOrUndefined from '../nullable/isNullOrUndefined';
import { isSymbol } from '../symbol';

import type { SyncIterable } from './types';

/**
 * 是不是一个同步可迭代的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 更多内容，请参考 `isIterable` 方法的文档
 */
export default function isSyncIterable<T = unknown>(
    value: unknown
): value is SyncIterable<T> {
    const iterator = Symbol?.iterator;

    return (
        isSymbol(iterator) &&
        !isNullOrUndefined(value) &&
        isFunction((value as any)[iterator])
    );
}
