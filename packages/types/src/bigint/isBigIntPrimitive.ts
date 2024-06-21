import typeofEqual from '../type/typeofEqual';

/**
 * 是不是一个基本的大数，即 `bigint`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigIntPrimitive(value: unknown): value is bigint {
    return typeofEqual(value, 'bigint');
}
