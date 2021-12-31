/**
 * 是不是一个 `BigInt` (大数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigInt(value: unknown): value is BigInt {
    return typeof value === 'bigint';
}
