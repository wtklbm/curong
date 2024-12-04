import { isWeakMap } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `WeakMap`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWeakMap<K extends object, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is WeakMap<K, V> {
    return typeGuard({ [variableName]: value }, '不是一个 WeakMap', isWeakMap);
}
