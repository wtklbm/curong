import getTag from './getTag';

/**
 * 是不是一个被包装后的字符串对象，即 `new String()`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStringObject(value: any): value is String {
    return typeof value === 'object' && getTag(value) === 'String';
}
