import { getTagEqual } from '..';

/**
 * 是不是一个 `Int8Array`，每一项占一个字节，值为 `-2^7 - 2^7-1` ，即 `-128 - 127`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt8Array(value: unknown): value is Int8Array {
    return getTagEqual(value, 'Int8Array');
}
