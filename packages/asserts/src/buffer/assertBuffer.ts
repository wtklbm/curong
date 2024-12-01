import { isBuffer } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Buffer`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * `Buffer` 类是 JavaScript `Uint8Array` 类的子类，并使用涵盖额外用例的方法对其进行扩展。
 * `Node.js` API 在支持 `Buffer` 的地方也接受纯 `Uint8Array`。
 *  在进行类型判断时，应该始终使用 `isBuffer` 方法。而不是使用 `isUint8Array`。
 */
export default function assertBuffer(
    value: unknown,
    variableName: string
): asserts value is Buffer {
    return typeGuard({ [variableName]: value }, '不是一个 Buffer', isBuffer);
}
