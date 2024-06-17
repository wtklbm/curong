import isFloat from './isFloat';

/**
 * 是不是一个无符号浮点数，即大于 `0` 的浮点数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUFloat(value: unknown): value is number {
    return isFloat(value) && value > 0;
}
