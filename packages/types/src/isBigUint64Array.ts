import getTag from './getTag';

/**
 * 是不是一个 `BigUint64Array`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigUint64Array(value: unknown): value is BigUint64Array {
    return getTag(value) === 'BigUint64Array';
}
