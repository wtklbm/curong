import { isArrayLike } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个类数组 (包括稀疏的类数组，不包含数组和稀疏数组)
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param similarity 类数组的相似程度，默认值为 `0`
 *
 *  - `0`: 粗略判断，只要 `length` 属性符合要求即可
 *  - `1`: 在保证 `length` 符合要求的情况下，判断对象中可枚举的属性是否存在
 *  - `2`: 不仅属性存在，还要保证对象的可枚举的属性的个数是 `length` 的个数加一
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertArrayLike<T = unknown>(
    value: unknown,
    variableName: string,
    similarity: 0 | 1 | 2 = 0
): asserts value is ArrayLike<T> {
    return typeGuard(
        { [variableName]: value },
        '不是一个类数组 (包括稀疏的类数组，不包含数组和稀疏数组)',
        isArrayLike,
        similarity
    );
}
