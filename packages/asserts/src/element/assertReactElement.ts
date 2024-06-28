import { isReactElement } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个 `React` 元素
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertReactElement(
    value: unknown,
    variableName: string
) {
    return typeGuard(value, variableName, isReactElement);
}
