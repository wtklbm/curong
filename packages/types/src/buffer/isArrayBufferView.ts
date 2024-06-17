import isDataView from './isDataView';
import isTypedArray from './isTypedArray';

/**
 * 是不是一个 `ArrayBufferView`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。
 *
 * 可以验证的值:
 *  - `Int8Array`、`Uint8Array`、`Uint8ClampedArray`
 *  - `Int16Array`、`Uint16Array`
 *  - `Int32Array`、`Uint32Array`
 *  - `Float32Array`、`Float64Array`
 *  - `BigInt64Array`、`BigUint64Array`
 *  - `DataView`
 *
 *  虽然 `Buffer` 是基于 `ArrayBuffer` 的，但是 `isArrayBufferView(Buffer.from(''))` 的结果为 `false`。
 *  如果需要验证 `Buffer`，请使用 `isBuffer` 方法。
 *
 * @note
 *
 * `ArrayBuffer` 是一个字节数组，通常在其他语言中称为 `byte array` (字节数组)。`ArrayBuffer` 中的内容不能直接被操作，而是要通过 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) (类型化数组对象) 或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
 */
export default function isArrayBufferView(
    value: any
): value is ArrayBufferView {
    return isTypedArray(value) || isDataView(value);
}
