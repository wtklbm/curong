import isBigInt from './isBigInt';

/**
 * 是不是一个大于 `0n` 的 `BigInt` (大数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigIntHave(value: unknown): value is BigInt {
    return isBigInt(value) && (value as BigInt) > 0n;
}
