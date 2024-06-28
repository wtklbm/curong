import { isMap } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Map`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertMap<K = unknown, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Map<K, V> {
    return typeGuard(value, variableName, isMap);
}
