import { isNullOrUndefinedArray } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的数组，且每一项的值都是 `null` 或 `undefined`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNullOrUndefinedArray(
    value: unknown,
    variableName: string
): asserts value is Array<null | undefined> {
    return typeGuard(value, variableName, isNullOrUndefinedArray);
}
