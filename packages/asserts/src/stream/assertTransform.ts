import type { Transform } from 'stream';

import { isTransform } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个转换流
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTransform(
    value: unknown,
    variableName: string
): asserts value is Transform {
    return typeGuard({ [variableName]: value }, '不是一个转换流', isTransform);
}
