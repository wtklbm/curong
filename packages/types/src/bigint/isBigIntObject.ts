import getTagEqual from '../type/getTagEqual';
import typeofEqual from '../type/typeofEqual';

/**
 * 是不是一个被包装后的 `BigInt` 对象，即 `Object(0n)`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBigIntObject(value: unknown): value is BigInt {
    return typeofEqual(value, 'object') && getTagEqual(value, 'BigInt');
}
