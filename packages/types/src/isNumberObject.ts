import getTagEqual from './getTagEqual';

/**
 * 是不是一个被包装后的数字对象，即 `new Number()` || `Object(0)`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberObject(value: unknown): value is Number {
    return typeof value === 'object' && getTagEqual(value, 'Number');
}
