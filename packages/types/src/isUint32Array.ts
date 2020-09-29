import getTag from './getTag';

/**
 * 是不是一个 `Uint32Array`，每一项的值为 `0 - 4294967295`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint32Array(value: any): value is Uint32Array {
    return getTag(value) === 'Uint32Array';
}
