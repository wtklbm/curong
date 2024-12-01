import { isInt16 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个 `int16`，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt16(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个 int16，取值范围为 `-2^15 - 2^15-1` 的整数，即 `-32768 - 32767`',
        isInt16
    );
}
