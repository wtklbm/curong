import isAnyError from './isAnyError';

/**
 * 是不是一个 `name` 和 `message` 相同的 `Error` 对象
 *
 * @param value 要验证的值
 * @param name 错误的类型名
 * @param message 错误的消息
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSameError<T extends Error = Error>(
    value: unknown,
    name: string,
    message: string
): value is T {
    return (
        isAnyError(value) && value.name === name && value.message === message
    );
}
