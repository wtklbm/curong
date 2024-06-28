import { isElement } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Element`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - `Element` 是最通用的基类，`Document` 中的所有对象都继承自该基类
 * - `Element` 里面定义了一些公共的方法和属性
 */
export default function assertElement(
    value: unknown,
    variableName: string
): asserts value is Element {
    return typeGuard(value, variableName, isElement);
}
