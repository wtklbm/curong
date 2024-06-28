import { isNumberPrimitive } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个基本的数字，即 `number` || `Number()`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param isAllowNaN 当值为 `NaN` 时是否返回 `true`，默认为 `false`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNumberPrimitive(
    value: unknown,
    variableName: string,
    isAllowNaN: boolean = false
): asserts value is number {
    return typeGuard(value, variableName, isNumberPrimitive, isAllowNaN);
}
