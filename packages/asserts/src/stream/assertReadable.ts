import type { Readable } from 'stream';

import { isReadable } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个可读流
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note 因为双工流包括可读流，所以 `new Duplex()` 的结果返回 `true`
 */
export default function assertReadable(
    value: unknown,
    variableName: string
): asserts value is Readable {
    return typeGuard(value, variableName, isReadable);
}
