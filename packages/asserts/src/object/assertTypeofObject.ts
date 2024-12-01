import { isTypeofObject } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 使用 `typeof` 判断是不是一个不是 `null` 的任意对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTypeofObject<K extends PropertyKey, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Record<K, V> {
    return typeGuard(
        { [variableName]: value },
        '不是一个非 null 的任意对象',
        isTypeofObject
    );
}
