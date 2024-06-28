import { isArrayBufferView } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `ArrayBufferView`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
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
 */
export default function assertArrayBufferView(
    value: unknown,
    variableName: string
): asserts value is ArrayBufferView {
    return typeGuard(value, variableName, isArrayBufferView);
}
