import isUint from './isUint';
import MAX_ARRAY_LENGTH from './MAX_ARRAY_LENGTH';

/**
 * 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrayIndex(value: unknown): value is number {
    return isUint(value) && value <= MAX_ARRAY_LENGTH;
}
