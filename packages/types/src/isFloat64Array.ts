import getTag from './getTag';

/**
 * 是不是一个 `Float64Array`，每一项的值为 `5.0×10-324 - 1.8×10308`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFloat64Array(value: any): value is Float64Array {
    return getTag(value) === 'Float64Array';
}
