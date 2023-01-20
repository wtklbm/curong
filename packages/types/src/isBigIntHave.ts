import isBigInt from './isBigInt';

/**
 * 是不是一个大于 `0n` 的 `bigint` (大数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - `BigInt` 和 `Number` 是不兼容的，不能相互赋值，也不能直接做加法运算
 */
export default function isBigIntHave(value: unknown): value is bigint {
    return isBigInt(value) && (value as BigInt) > 0n;
}
