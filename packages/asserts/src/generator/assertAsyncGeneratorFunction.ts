import { isAsyncGeneratorFunction } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个异步的 `Generator` 函数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertAsyncGeneratorFunction(
    value: unknown,
    variableName: string
): asserts value is AsyncGeneratorFunction {
    return typeGuard(value, variableName, isAsyncGeneratorFunction);
}
