import { getTag } from '../type';

import isBuffer from './isBuffer';
import type { TypedArray } from './types';

/** 验证 `TypedArray` 的类型的正则表达式 */
const typedArrayPattern =
    /^((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array$/;

/**
 * 是不是一个类型化数组 (`TypedArray`)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * 可以验证的值:
 *  - `Int8Array`、`Uint8Array`、`Uint8ClampedArray`
 *  - `Int16Array`、`Uint16Array`
 *  - `Int32Array`、`Uint32Array`
 *  - `Float32Array`、`Float64Array`
 *  - `BigInt64Array`、`BigUint64Array`
 *
 * 虽然 `Buffer` 是基于 `ArrayBuffer` 的，但是 `isTypedArray(Buffer.from(''))` 的结果为 `false`。
 * 如果需要验证 `Buffer`，请使用 `isBuffer` 方法。
 *
 * @note
 *
 * 一个 `TypedArray` 对象描述了底层二进制数据缓冲区的类数组视图。
 * 没有称为 `TypedArray` 的全局属性，也没有直接可用的 `TypedArray` 构造函数。
 * 但是，有很多不同的全局属性，其值是指定元素类型的类型化数组构造函数。
 */
export default function isTypedArray(value: any): value is TypedArray {
    return !isBuffer(value) && typedArrayPattern.test(getTag(value));
}
