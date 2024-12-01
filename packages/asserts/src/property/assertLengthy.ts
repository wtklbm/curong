import { isLengthy, type Lengthy } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertLengthy(
    value: unknown,
    variableName: string
): asserts value is Lengthy {
    return typeGuard(
        { [variableName]: value },
        '不是一个具有 length 属性的类型，其 length 的值是一个大于或等于 0 的安全的无符号整数',
        isLengthy
    );
}
