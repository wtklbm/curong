import getTag from './getTag';

/**
 * 是不是一个 `Int8Array`，每一项的值为 `-128 - 127`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isInt8Array(value: any): value is Int8Array {
    return getTag(value) === 'Int8Array';
}
