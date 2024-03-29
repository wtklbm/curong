import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';

/** 同步可迭代的类型 */
export interface SyncIterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

/**
 * 是不是一个同步可迭代的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 更多内容，请参考 `isIterable` 方法的文档
 */
export default function isSyncIterable<T = unknown>(
    value: any
): value is SyncIterable<T> {
    return !isNullOrUndefined(value) && isFunction(value[Symbol.iterator]);
}
