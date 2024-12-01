import { isArraySparse } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个稀疏数组 (不包含稀疏的类数组)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertArraySparse<T = unknown>(
    value: unknown,
    variableName: string
): asserts value is Array<T> {
    return typeGuard(
        { [variableName]: value },
        '不是一个稀疏数组 (不包含稀疏的类数组)',
        isArraySparse
    );
}
