import { isInt32Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Int32Array`，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertInt32Array(
    value: unknown,
    variableName: string
): asserts value is Int32Array {
    return typeGuard(
        { [variableName]: value },
        '不是一个 Int32Array，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`',
        isInt32Array
    );
}
