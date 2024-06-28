import { isObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个类型标记为 `[object Object]` 的对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertObject<K extends PropertyKey, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Record<K, V> {
    return typeGuard(value, variableName, isObject);
}
