import { isClass, type Class } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个类
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - 类不能直接执行，必须使用 `new` 关键字
 * - 类中无法访问 `caller`，`callee` 和 `arguments` 属性
 */
export default function assertClass<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown, variableName: string): asserts value is Class<R, A> {
    return typeGuard(value, variableName, isClass);
}
