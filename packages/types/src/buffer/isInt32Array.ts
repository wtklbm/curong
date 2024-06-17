import { getTagEqual } from '..';

/**
 * 是不是一个 `Int32Array`，每一项占四个字节，值为 `-2^31 - 2^31-1`，即 `-2147483648 - 2147483647`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt32Array(value: unknown): value is Int32Array {
    return getTagEqual(value, 'Int32Array');
}
