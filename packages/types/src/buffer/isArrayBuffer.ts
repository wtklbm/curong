import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `ArrayBuffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * `ArrayBuffer` 是一个字节数组，通常在其他语言中称为 `byte array` (字节数组)。
 * `ArrayBuffer` 中的内容不能直接被操作，而是要通过 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) (类型化数组对象) 或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 对象来操作。
 * 它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
 */
export default function isArrayBuffer(value: unknown): value is ArrayBuffer {
    return getTagEqual(value, 'ArrayBuffer');
}
