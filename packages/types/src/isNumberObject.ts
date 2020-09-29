import getTag from './getTag';

/**
 * 是不是一个被包装后的数字对象，即 `new Number()`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberObject(value: any): value is Number {
    return typeof value === 'object' && getTag(value) === 'Number';
}
