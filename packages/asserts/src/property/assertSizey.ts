import { isSizey, type Sizey } from '@curong/types';

import typeGuard from '../constants/typeGuard';

/**
 * 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于或等于 `0` 的安全的无符号整数
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 * @note 一些 `HTML` 元素也有 `size` 属性，比如 `input` 元素
 */
export default function assertSizey(
    value: unknown,
    variableName: string
): asserts value is Sizey {
    return typeGuard(
        { [variableName]: value },
        '不是一个具有 size 属性的类型，其 size 的值是一个大于或等于 0 的安全的无符号整数',
        isSizey
    );
}
