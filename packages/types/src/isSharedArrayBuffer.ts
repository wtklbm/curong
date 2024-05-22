import getTag from './getTag';

/**
 * 是不是一个 `SharedArrayBuffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSharedArrayBuffer(
    value: unknown
): value is SharedArrayBuffer {
    return getTag(value) === 'SharedArrayBuffer';
}
