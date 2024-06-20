import isAnyError from './isAnyError';

/**
 * 是不是一个 `name` 和 `message` 相同的 `Error` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSameError(
    value: unknown,
    name: string,
    message: string
): value is Error {
    return (
        isAnyError(value) && value.name === name && value.message === message
    );
}
