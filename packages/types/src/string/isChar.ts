import isString from './isString';

/**
 * 是不是单个字符
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isChar(value: unknown): value is string {
    return isString(value) && value.length === 1;
}
