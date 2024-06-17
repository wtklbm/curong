import { getTagEqual } from '..';

/**
 * 是不是一个被包装后的布尔值对象，即 `new Boolean` || `Object(true)`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBooleanObject(value: unknown): value is Boolean {
    // Note: `typeof` 不能够匹配通过类创建的布尔值对象，所以这里使用 `getTag` 方法
    return typeof value === 'object' && getTagEqual(value, 'Boolean');
}
