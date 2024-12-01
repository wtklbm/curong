import { isVarName } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是可以把值当做 `JavaScript` 的变量名
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertVarName(
    value: unknown,
    variableName: string
): asserts value is string {
    return typeGuard(
        { [variableName]: value },
        '不是可以把值当做 JavaScript 的变量名',
        isVarName
    );
}
