import isAnyError from './isAnyError';

/**
 * 是不是一个 `ReferenceError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isReferenceError(value: unknown): value is ReferenceError {
    return (
        isAnyError(value) &&
        Object.getPrototypeOf(value).name === 'ReferenceError'
    );
}
