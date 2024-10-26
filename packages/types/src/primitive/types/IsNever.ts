/**
 * 是不是一个 `never` 类型的值
 *
 * @typeParam T 要验证的值
 * @example
 *
 * ```typescript
 * IsNever<never> = true
 * IsNever<1> = false
 * IsNever<string> = false
 * ```
 * @returns 是则返回 `true`，否则为 `false`
 */
export type IsNever<T> = [T] extends [never] ? true : false;
