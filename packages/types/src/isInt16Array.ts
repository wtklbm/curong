import getTag from './getTag';

/**
 * 是不是一个 `Int16Array`，每一项的值为 `-32768 - 32767`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt16Array(value: unknown): value is Int16Array {
    return getTag(value) === 'Int16Array';
}
