import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `Int16Array`，每一项占两个字节，值为 `-2^15 - 2^15-1`，即 `-32768 - 32767`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt16Array(value: unknown): value is Int16Array {
    return getTagEqual(value, 'Int16Array');
}
