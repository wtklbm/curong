import { isNumberSafe } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个可以安全计算的数字
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertNumberSafe(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个可以安全计算的数字',
        isNumberSafe
    );
}
