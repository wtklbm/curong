import isBooleanPrimitive from './isBooleanPrimitive';
import isBooleanObject from './isBooleanObject';

/**
 * 是不是一个布尔值或被包装后的布尔值对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBoolean(value: any): value is boolean {
    return isBooleanPrimitive(value) || isBooleanObject(value);
}
