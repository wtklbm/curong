import isNull from '../isNull';

/**
 * 如果值为 `null`，则返回 `undefined`，否则返回原值
 *
 * 该函数通常用于处理可能为 `null` 的值，并确保返回一个明确的 `undefined` 或非 `undefined` 类型值。
 *
 * @param value 要检查的值
 * @returns 如果 `value` 为 `null`，则返回 `undefined`，否则返回 `value`
 * @example
 * ```typescript
 * console.log(nullToUndefined(null)); // undefined
 * console.log(nullToUndefined(undefined)); // undefined
 * console.log(nullToUndefined('hello')); // 'hello'
 * console.log(nullToUndefined(42)); // 42
 * console.log(nullToUndefined(false)); // false
 * ```
 */
export default function nullToUndefined<T>(value: unknown): T | undefined {
    return isNull(value) ? undefined : (value as T);
}
