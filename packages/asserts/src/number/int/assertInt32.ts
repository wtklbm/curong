import { isInt32 } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个 `int32`，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt32(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个 int32，取值范围为 `-2^31 - 2^31-1` 的整数，即 `-2147483648 - 2147483647`',
        isInt32
    );
}
