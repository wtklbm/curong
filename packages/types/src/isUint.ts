import isInt from './isInt';

/**
 * 是不是一个无符号整数，即大于或等于 `0` 的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint(value: any): value is number {
    return isInt(value) && value >= 0;
}
