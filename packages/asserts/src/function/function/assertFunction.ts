import { isFunction, type Function } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个函数 (包含同步函数、异步函数、`Generator` 函数 ...)
 *
 * 该函数可以验证任何类型的函数，只要 `typeof value` 为 `function` 就会返回 `true`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFunction<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: unknown, variableName: string): asserts value is Function<R, A> {
    return typeGuard(
        { [variableName]: value },
        '不是一个函数 (包含同步函数、异步函数、Generator 函数 ...)',
        isFunction
    );
}
