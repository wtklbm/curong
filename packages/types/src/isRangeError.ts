import isAnyError from './isAnyError';

/**
 * 是不是一个 `RangeError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isRangeError(value: any): value is RangeError {
    return (
        isAnyError(value) && Object.getPrototypeOf(value).name === 'RangeError'
    );
}
