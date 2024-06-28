import { isSameError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `name` 和 `message` 相同的 `Error` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param name 错误的类型名
 * @param message 错误的消息
 * @throws 如果不是则会抛出类型异常
 */
export default function assertSameError<T extends Error = Error>(
    value: unknown,
    variableName: string,
    name: string,
    message: string
): asserts value is T {
    return typeGuard(value, variableName, isSameError, name, message);
}
