import type { Duplex } from 'stream';

import { isDuplex } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个双工流
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note 因为 `Transform` 也是双工流，所以 `new Transform()` 返回 `true`
 */
export default function assertDuplex(
    value: unknown,
    variableName: string
): asserts value is Duplex {
    return typeGuard(value, variableName, isDuplex);
}
