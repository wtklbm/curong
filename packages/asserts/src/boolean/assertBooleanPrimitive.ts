import { isBooleanPrimitive } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个基本的布尔值，即 `boolean` || `Boolean()`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBooleanPrimitive(
    value: unknown,
    variableName: string
): asserts value is boolean {
    return typeGuard(
        { [variableName]: value },
        '不是一个基本的布尔值，即 boolean || Boolean()',
        isBooleanPrimitive
    );
}
