import { isPureObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个纯对象，即通过 `Object.create(null)` 创建的对象，该对象的原型就是 `null`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPureObject<K extends PropertyKey, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Record<K, V> {
    return typeGuard(value, variableName, isPureObject);
}
