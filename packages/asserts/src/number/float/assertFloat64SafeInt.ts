import { isFloat64SafeInt } from '@curong/types';

import typeGuard from '../../constants/typeGuard';

/**
 * 是不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertFloat64SafeInt(
    value: unknown,
    variableName: string
): asserts value is number {
    return typeGuard(
        { [variableName]: value },
        '不是一个可以被双精度浮点数所能存储的整数，即 `2^53-1`，取值范围为 `-9007199254740991 - 9007199254740991`',
        isFloat64SafeInt
    );
}
