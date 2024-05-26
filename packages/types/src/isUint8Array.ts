import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Uint8Array`，每一项的值为 `0 - 255`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint8Array(value: unknown): value is Uint8Array {
    return getTagEqual(value, 'Uint8Array');
}
