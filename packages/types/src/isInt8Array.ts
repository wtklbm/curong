import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `Int8Array`，每一项的值为 `-128 - 127`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt8Array(value: unknown): value is Int8Array {
    return getTagEqual(value, 'Int8Array');
}
