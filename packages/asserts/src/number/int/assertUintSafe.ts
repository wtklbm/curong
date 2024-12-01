import { isUintSafe } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个安全的无符号整数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 安全整数范围为 `-(2^53 - 1)` 到 `2^53 - 1` 之间的整数，包含 `-(2^53 - 1)` 和 `2^53 - 1`。
 */
export default function assertUintSafe(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个安全的无符号整数',
        isUintSafe
    );
}
