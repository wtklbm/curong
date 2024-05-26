import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Uint8ClampedArray`，每一项的值为 `0 - 255`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint8ClampedArray(
    value: any
): value is Uint8ClampedArray {
    return getTagEqual(value, 'Uint8ClampedArray');
}
