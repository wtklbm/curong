import { isPlainObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个普通对象，即 `{}`，该对象的原型指向 `Object.prototype`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertPlainObject<K extends PropertyKey, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Record<K, V> {
    return typeGuard(value, variableName, isPlainObject);
}
