import { getTagEqual } from '..';

/**
 * 是不是一个 `BigUint64Array`，每一项占八个字节，值为 `0 - 2^64-1`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)
 */
export default function isBigUint64Array(
    value: unknown
): value is BigUint64Array {
    return getTagEqual(value, 'BigUint64Array');
}
