import { isArray } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个数组
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 该方法将首先尝试调用 `Array.isArray`，如果调用失败，则尝试通过 `Object.prototype.toString.call` 获取标签，判断是否等于 `[object Array]`。
 */
export default function assertArray<T extends unknown[]>(
    value: unknown,
    variableName: string
): asserts value is T {
    return typeGuard({ [variableName]: value }, '不是一个数组', isArray);
}
