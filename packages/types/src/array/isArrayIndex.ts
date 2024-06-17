import { isUint } from '..';

/**
 * 获取数组最大索引下标的数字。最大为 `2` 的 `32` 次方减一，即 `4294967295`
 */
const MAX_ARRAY_LENGTH = 2 ** 32 - 1;

/**
 * 是不是一个数组的下标索引，它是一个大于或等于 `0` 并且小于或等于数组的最大长度的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrayIndex(value: unknown): value is number {
    return isUint(value) && value <= MAX_ARRAY_LENGTH;
}
