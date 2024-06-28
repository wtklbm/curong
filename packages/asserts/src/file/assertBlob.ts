import { isBlob } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `Blob`
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * `Blob` 是不可变的原始数据的类似文件的对象，
 * 可以被读取为文本或二进制数据，也可以转换为 `ReadableStream`
 */
export default function assertBlob(
    value: unknown,
    variableName: string
): asserts value is Blob {
    return typeGuard(value, variableName, isBlob);
}
