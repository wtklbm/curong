import getTag from './getTag';

/**
 * 是不是一个 `Uint16Array`，每一项的值为 `	0 - 65535`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isUint16Array(value: any): value is Uint16Array {
    return getTag(value) === 'Uint16Array';
}
