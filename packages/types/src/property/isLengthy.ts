import { isNullOrUndefined, isUintSafe } from '..';

import type { Lengthy } from './types';

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthy<T extends {}>(
    value: unknown
): value is Lengthy<T> {
    return !isNullOrUndefined(value) && isUintSafe((value as any).length);
}
