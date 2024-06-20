import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `Uint32Array`，每一项占四个字节，值为 `0 - 2^32-1`，即 `0 - 4294967295`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint32Array(value: unknown): value is Uint32Array {
    return getTagEqual(value, 'Uint32Array');
}
