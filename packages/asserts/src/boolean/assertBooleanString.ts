import { isBooleanString } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个布尔值字符串，即字符串 `true` 或 `false`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBooleanString(
    value: unknown,
    variableName: string
): asserts value is 'true' | 'false' {
    return typeGuard(
        { [variableName]: value },
        '不是一个布尔值字符串，即字符串 true 或 false',
        isBooleanString
    );
}
