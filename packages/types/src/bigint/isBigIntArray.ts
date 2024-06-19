import { isArrayHave } from '..';

import isBigInt from './isBigInt';

/**
 * 是不是一个长度大于 0 的数组，且每一项的值都是 `bigint` (大数) 或被包装后的 `BigInt` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigIntArray(value: unknown): value is bigint[] {
    return isArrayHave(value) && value.every(isBigInt);
}
