import isInt8Array from './isInt8Array';
import isUint8Array from './isUint8Array';
import isUint8ClampedArray from './isUint8ClampedArray';
import isInt16Array from './isInt16Array';
import isUint16Array from './isUint16Array';
import isInt32Array from './isInt32Array';
import isUint32Array from './isUint32Array';
import isFloat32Array from './isFloat32Array';
import isFloat64Array from './isFloat64Array';
import isDataView from './isDataView';
import isBuffer from './isBuffer';

/** `ArrayBufferView` 是任何 `TypedArray` 类型(二进制缓冲区)的帮助程序类型 */
export type ArrayBufferView =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | DataView;

/**
 * 是不是一个 `ArrayBufferView`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 需要注意的是：虽然 `Buffer` 是基于 `ArrayBuffer` 的，但是 `isArrayBufferView(Buffer.from(''))` 的结果为 `false`。
 * 如果需要验证 `Buffer`，请使用 `isBuffer` 方法。
 *
 * `ArrayBufferView` 是代表以下任何 `TypedArray` 类型(二进制缓冲区)的帮助程序类型：
 *
 * - `Int8Array`
 * - `Uint8Array`
 * - `Uint8ClampedArray`
 * - `Int16Array`
 * - `Uint16Array`
 * - `Int32Array`
 * - `Uint32Array`
 * - `Float32Array`
 * - `Float64Array`
 * - `DataView`
 */
export default function isArrayBufferView(
    value: any
): value is ArrayBufferView {
    const isBufferView =
        isInt8Array(value) ||
        isUint8Array(value) ||
        isUint8ClampedArray(value) ||
        isInt16Array(value) ||
        isUint16Array(value) ||
        isInt32Array(value) ||
        isUint32Array(value) ||
        isFloat32Array(value) ||
        isFloat64Array(value) ||
        isDataView(value);

    return isBufferView && !isBuffer(value);
}
