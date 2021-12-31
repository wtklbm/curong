import getTag from './getTag';

/**
 * 是不是一个 `BigInt64Array`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigInt64Array(value: unknown): value is BigInt64Array {
    return getTag(value) === 'BigInt64Array';
}
