import getTagEqual from './getTagEqual';

/**
 * 是不是一个 `BigInt64Array`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)
 */
export default function isBigInt64Array(
    value: unknown
): value is BigInt64Array {
    return getTagEqual(value, 'BigInt64Array');
}
