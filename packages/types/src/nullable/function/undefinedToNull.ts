import isUndefined from '../isUndefined';

/**
 * 如果值为 `undefined`，则返回 `null`，否则返回原值
 *
 * 该函数通常用于处理可能为 `undefined` 的值，并确保返回一个明确的 `null` 或非 `null` 类型值。
 *
 * @param value 要检查的值
 * @returns 如果 `value` 为 `undefined`，则返回 `null`，否则返回 `value`
 * @example
 * ```typescript
 * console.log(undefinedToNull(undefined)); // null
 * console.log(undefinedToNull(null)); // null
 * console.log(undefinedToNull('hello')); // 'hello'
 * console.log(undefinedToNull(42)); // 42
 * console.log(undefinedToNull(false)); // false
 * ```
 */
export default function undefinedToNull<T>(value: unknown): T | null {
    return isUndefined(value) ? null : (value as T);
}
