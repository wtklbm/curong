import { isLeapYear } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个闰年年份
 *
 * 闰年的定义如下：年份能被 4 整除且不能被 100 整除，或者年份能被 400 整除
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertLeapYear(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(value, variableName, isLeapYear);
}
