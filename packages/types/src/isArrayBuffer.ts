import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `ArrayBuffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `ArrayBuffer` 是一种数据类型(字节数组)，用来表示一个通用的、固定长度的二进制数据缓冲区。
 * 你不能直接操作 `ArrayBuffer` 的内容，而是要通过类型数组对象或 `DataView` 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
 */
export default function isArrayBuffer(value: unknown): value is ArrayBuffer {
    return getTagEqual(value, 'ArrayBuffer');
}
