import { getTagEqual } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 判断原型上的类型标记是否等于某个值
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @param tag 要比较的类型标记
 * @throws 如果不是则会抛出类型异常
 */
export default function assertTagEqual<T = unknown>(
    value: unknown,
    variableName: string,
    tag: string
): asserts value is T {
    return typeGuard(
        { [variableName]: value },
        '原型上的类型标记不等于某个值',
        getTagEqual,
        tag
    );
}
