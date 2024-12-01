import { isArguments } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是函数的形参
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertArguments(
    value: unknown,
    variableName: string
): asserts value is IArguments {
    return typeGuard({ [variableName]: value }, '不是函数的形参', isArguments);
}
