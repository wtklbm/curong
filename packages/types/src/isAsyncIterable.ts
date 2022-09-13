import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';

/** 异步可迭代的类型 */
export interface AsyncIterable<T = unknown, R = any, N = unknown> {
    [Symbol.asyncIterator](): AsyncGenerator<T, R, N>;
}

/**
 * 是不是一个异步可迭代的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 更多内容，请参考 `isIterable` 方法的文档
 */
export default function isAsyncIterable<T = unknown>(
    value: any
): value is AsyncIterable<T> {
    return !isNullOrUndefined(value) && isFunction(value[Symbol.asyncIterator]);
}
