import type { Stream } from 'stream';

import { isStream } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个流
 *
 * 流包括：可读流、可写流、转换流、双工流。
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertStream(
    value: unknown,
    variableName: string
): asserts value is Stream {
    return typeGuard(value, variableName, isStream);
}