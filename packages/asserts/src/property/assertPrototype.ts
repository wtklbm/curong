import { isPrototype } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个构造函数的原型对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPrototype<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard(value, variableName, isPrototype);
}
