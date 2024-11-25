import isNullOrUndefined from '../isNullOrUndefined';

/**
 * 如果值为 `null` 或 `undefined`，则返回 `undefined`，否则返回原值
 *
 * 该函数通常用于处理可能为 `null` 或 `undefined` 的值，并确保返回一个明确的 `undefined` 或非 `undefined` 类型值。
 *
 * @param value 要检查的值
 * @returns 如果 `value` 为 `null` 或 `undefined`，则返回 `undefined`，否则返回 `value`
 * @example
 * ```typescript
 * console.log(nullableToUndefined(null)); // undefined
 * console.log(nullableToUndefined(undefined)); // undefined
 * console.log(nullableToUndefined('hello')); // 'hello'
 * console.log(nullableToUndefined(42)); // 42
 * console.log(nullableToUndefined(false)); // false
 * ```
 */
export default function nullableToUndefined<T>(value: unknown): T | undefined {
    return isNullOrUndefined(value) ? undefined : (value as T);
}
