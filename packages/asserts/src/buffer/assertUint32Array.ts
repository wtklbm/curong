import { isUint32Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Uint32Array`，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertUint32Array(
    value: unknown,
    variableName: string
): asserts value is Uint32Array {
    return typeGuard(
        { [variableName]: value },
        '不是一个 Uint32Array，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`',
        isUint32Array
    );
}
