import isFunction from '../function/isFunction';

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
    try {
        return isFunction((value as SyncIterable<T>)[Symbol.iterator]);
    } catch {}

    return false;
}
