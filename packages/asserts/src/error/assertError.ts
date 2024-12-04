import { isError } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Error` 对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note 如果想验证任意的错误对象，请使用 `isAnyError` 方法
 */
export default function assertError(
    value: unknown,
    variableName: string
): asserts value is Error {
    return typeGuard({ [variableName]: value }, '不是一个 Error 对象', isError);
}
