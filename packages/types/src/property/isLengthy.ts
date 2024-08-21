import isUintSafe from '../number/int/isUintSafe';

import type { Lengthy } from './types';

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 `0` 的安全的无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthy(value: unknown): value is Lengthy {
    try {
        return isUintSafe((value as Lengthy).length);
    } catch {}

    return false;
}
