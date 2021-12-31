import isBuffer from './isBuffer';

/**
 * 是不是一个长度大于 `0` 的  `Buffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBufferHave(value: unknown): value is Buffer {
    return isBuffer(value) && value.length > 0;
}
