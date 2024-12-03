import isAnyError from './isAnyError';

/**
 * 是不是一个 `AggregateError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - `AggregateError` 对象代表了包装了多个错误对象的单个错误对象
 * - `AggregateError` 是 `Error` 的子类
 */
export default function isAggregateError(
    value: unknown
): value is AggregateError {
    return (
        isAnyError(value) &&
        Object.getPrototypeOf(value).name === 'AggregateError'
    );
}
