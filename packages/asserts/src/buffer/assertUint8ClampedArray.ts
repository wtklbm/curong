import { isUint8ClampedArray } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Uint8ClampedArray`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255` (一定在 `0` 到 `255` 之间)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * `Uint8ClampedArray` 像 `Uint8Array` 一样以二进制形式存储数字，但是当存储超出范围的数字时，
 * 它会将数字钳制 (`clamp`) 到 `0` 到 `255` 的范围内，而不是截断最高有效位。
 */
export default function assertUint8ClampedArray(
    value: unknown,
    variableName: string
): asserts value is Uint8ClampedArray {
    return typeGuard(value, variableName, isUint8ClampedArray);
}
