import { isAnyError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个任意的 `Error` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 验证以下错误对象:
 *
 * - `Error`
 * - `EvalError`
 * - `RangeError`
 * - `ReferenceError`
 * - `SyntaxError`
 * - `TypeError`
 * - 一切 `Object.prototype.toString.call(value) === '[object Error]'` 的对象
 */
export default function assertAnyError<T extends Error = Error>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard(value, variableName, isAnyError);
}
