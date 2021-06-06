import isInt from './isInt';

/**
 * 是不是一个大于 0 的无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUintHave(value: any): value is number {
    return isInt(value) && value > 0;
}
