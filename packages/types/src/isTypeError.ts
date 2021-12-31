import isAnyError from './isAnyError';

/**
 * 是不是一个 `TypeError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTypeError(value: unknown): value is TypeError {
    return (
        isAnyError(value) && Object.getPrototypeOf(value).name === 'TypeError'
    );
}
