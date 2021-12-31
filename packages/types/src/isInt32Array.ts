import getTag from './getTag';

/**
 * 是不是一个 `Int32Array`，每一项的值为 `-2147483648 - 2147483647`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt32Array(value: unknown): value is Int32Array {
    return getTag(value) === 'Int32Array';
}
