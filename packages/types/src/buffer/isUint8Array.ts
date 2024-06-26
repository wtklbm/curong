import getTagEqual from '../type/getTagEqual';

import isBuffer from './isBuffer';

/**
 * 是不是一个 `Uint8Array`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。
 * @note
 *
 * `Buffer` 类是 JavaScript `Uint8Array` 类的子类，但是此方法会返回 `false`。
 * 如果想判断是不是 `Buffer`，请使用 `isBuffer` 方法。
 */
export default function isUint8Array(value: unknown): value is Uint8Array {
    return getTagEqual(value, 'Uint8Array') && !isBuffer(value);
}
