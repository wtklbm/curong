import isArray from './isArray';
import isBigInt from './isBigInt';

/**
 * 是不是一个数组，且每一项的值都是 `bigInt` (大数) 或被包装后的 `BigInt` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigIntArray(value: unknown): value is bigint[] {
    return isArray(value) && value.every(isBigInt);
}