import { isObjectArray } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是标记为 `[object Object]` 的对象
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertObjectArray<K extends PropertyKey, V = unknown>(
    value: unknown,
    variableName: string
): asserts value is Record<K, V>[] {
    return typeGuard(
        { [variableName]: value },
        '不是一个长度大于 0 的数组，且每一项的值都是标记为 [object Object] 的对象',
        isObjectArray
    );
}
