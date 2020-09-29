import isDouble from './isDouble';

/**
 * 是不是一个无符号浮点数，即大于 `0` 的浮点数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUDouble(value: any): value is number {
    return isDouble(value) && value > 0;
}
