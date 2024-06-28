import { isPromiseLike } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个有 `then` 方法的像 `Promise` 的对象或函数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPromiseLike<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is Promise<T> {
    return typeGuard(value, variableName, isPromiseLike);
}
