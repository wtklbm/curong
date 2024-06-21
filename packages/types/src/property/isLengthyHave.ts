import isLengthy from './isLengthy';
import type { Lengthy } from './types';

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于 `0` 的安全的无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthyHave(value: unknown): value is Lengthy {
    return isLengthy(value) && value.length > 0;
}
