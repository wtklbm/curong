import { isTrue } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是 `true`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTrue(
    value: unknown,
    variableName: string
): asserts value is true {
    return typeGuard({ [variableName]: value }, '不是 true', isTrue);
}
