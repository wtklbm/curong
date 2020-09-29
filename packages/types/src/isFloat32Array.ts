import getTag from './getTag';

/**
 * 是不是一个 `Float32Array`，每一项的值为 `1.2×10-38 - 3.4×1038`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat32Array(value: any): value is Float32Array {
    return getTag(value) === 'Float32Array';
}
