import { getTagEqual } from '..';

/**
 * 是不是一个 `Uint8ClampedArray`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255` (一定在 0 到 255 之间)
 *
 * `Uint8ClampedArray` 像 `Uint8Array` 一样以二进制形式存储数字，但是当存储超出范围的数字时，它会将数字钳制 (`clamp`) 到 `0` 到 `255` 的范围内，而不是截断最高有效位。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint8ClampedArray(
    value: any
): value is Uint8ClampedArray {
    return getTagEqual(value, 'Uint8ClampedArray');
}
