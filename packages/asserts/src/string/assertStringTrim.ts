import { isStringTrim } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个经过 `trim` 后长度大于指定长度的字符串
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param length 当字符串被 `trim` 之后，剩余的长度要大于 `length` 才返回 `true`，默认 `length` 为 `0`
 * @throws 如果不是则会抛出类型异常
 */
export default function assertStringTrim(
    value: unknown,
    variableName: string,
    length: number = 0
): asserts value is string {
    return typeGuard(value, variableName, isStringTrim, length);
}
