import { isGenerator } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个同步或异步的 `Generator`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * - 每一个 `Generator` 上，都会有三个方法: `next`、`throw`、`return`
 */
export default function assertGenerator<T = unknown, R = unknown, N = unknown>(
    value: unknown,
    variableName: string
): asserts value is Generator<T, R, N> | AsyncGenerator<T, R, N> {
    return typeGuard(
        { [variableName]: value },
        '不是一个同步或异步的 Generator',
        isGenerator
    );
}
