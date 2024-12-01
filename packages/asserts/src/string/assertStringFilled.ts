import { isStringFilled } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个长度大于 `0` 的字符串
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertStringFilled(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(
        { [variableName]: value },
        '不是一个长度大于 0 的字符串',
        isStringFilled
    );
}
