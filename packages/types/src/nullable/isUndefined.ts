import typeofEqual from '../type/typeofEqual';

/**
 * 是不是 `undefined`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUndefined(value: unknown): value is undefined {
    return typeofEqual(value, 'undefined');
}
