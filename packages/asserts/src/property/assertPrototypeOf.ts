import { isPrototypeOf } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 判断一个对象是否存在于另一个对象的原型链中
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPrototypeOf<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard(value, variableName, isPrototypeOf);
}
