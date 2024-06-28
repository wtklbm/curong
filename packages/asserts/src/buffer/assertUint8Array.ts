import { isUint8Array } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Uint8Array`，每一项占一个字节，值为 `0 - 2^8-1`，即 `0 - 255`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * `Buffer` 类是 JavaScript `Uint8Array` 类的子类，但是此方法会返回 `false`。
 * 如果想判断是不是 `Buffer`，请使用 `isBuffer` 方法。
 */
export default function assertUint8Array(
    value: unknown,
    variableName: string
): asserts value is Uint8Array {
    return typeGuard(value, variableName, isUint8Array);
}
