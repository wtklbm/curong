import isBigIntObject from './isBigIntObject';
import isBigIntPrimitive from './isBigIntPrimitive';

/**
 * 是不是一个 `bigint` (大数) 或被包装后的 `BigInt` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - `BigInt` 和 `Number` 是不兼容的，不能相互赋值，也不能直接做加法运算
 */
export default function isBigInt(value: unknown): value is bigint {
    return isBigIntPrimitive(value) || isBigIntObject(value);
}
