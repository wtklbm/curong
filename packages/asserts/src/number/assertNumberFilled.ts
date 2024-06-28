import { isNumberFilled } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个不是 `0`、`Infinity`、`-Infinity` 或 `NaN` 的数字
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNumberFilled(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isNumberFilled);
}
