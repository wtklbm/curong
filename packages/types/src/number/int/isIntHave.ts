import isInt from './isInt';

/**
 * 是不是一个大于 `0` 的整数，即无符号整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isIntHave(value: unknown): value is number {
    return isInt(value) && value > 0;
}
