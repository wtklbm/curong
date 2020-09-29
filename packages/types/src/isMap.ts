import getTag from './getTag';

/**
 * 是不是一个 `Map`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isMap(value: any): value is Map<any, any> {
    return getTag(value) === 'Map';
}
