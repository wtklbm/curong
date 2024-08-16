import { isErrorLike } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个类错误对象
 *
 * 该函数会判断传入的值是否是一个对象，并且该对象是否具有 `name`、`message` 和 `stack` 属性。
 * `message` 的值可以为空，`name` 和 `stack` 的值不能为空。
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertErrorLike(
    value: unknown,
    variableName: string
): asserts value is Error {
    return typeGuard(value, variableName, isErrorLike);
}
