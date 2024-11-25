import isNullOrUndefined from '../isNullOrUndefined';

/**
 * 如果值为 `null` 或 `undefined`，则返回 `null`，否则返回原值
 *
 * 该函数通常用于处理可能为 `null` 或 `undefined` 的值，并确保返回一个明确的 `null` 或非 `null` 的类型值。
 *
 * @param value 要检查的值
 * @returns 如果 `value` 是 `null` 或 `undefined`，则返回 `null`，否则返回 `value`
 * @example
 * ```typescript
 * console.log(nullableToNull(null)); // null
 * console.log(nullableToNull(undefined)); // null
 * console.log(nullableToNull('hello')); // 'hello'
 * console.log(nullableToNull(42)); // 42
 * console.log(nullableToNull(false)); // false
 * ```
 */
export default function nullableToNull<T>(value: unknown): T | null {
    return isNullOrUndefined(value) ? null : (value as T);
}
