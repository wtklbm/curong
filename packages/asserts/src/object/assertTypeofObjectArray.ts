import { isTypeofObjectArray } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是对象 (通过 `typeof` 判断且不为 `null`)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTypeofObjectArray<
    K extends PropertyKey,
    V = unknown
>(value: unknown, variableName: string): asserts value is Record<K, V>[] {
    return typeGuard(value, variableName, isTypeofObjectArray);
}
