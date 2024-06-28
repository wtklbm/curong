import { isNullOrUndefined } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是 `undefined` 或者 `null`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNullOrUndefined(
    value: unknown,
    variableName: string
): asserts value is null | undefined {
    return typeGuard(value, variableName, isNullOrUndefined);
}
