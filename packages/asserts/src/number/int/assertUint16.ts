import { isUint16 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个 `uint16`，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertUint16(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个 uint16，取值范围为 `0 - 2^16-1` 的正整数，即 `0 - 65535`',
        isUint16
    );
}
