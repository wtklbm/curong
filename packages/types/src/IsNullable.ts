/**
 * 是不是一个 `null` 或 `undefined` 类型的值
 *
 * @typeParam T 要验证的值
 * @example
 *
 * ```typescript
 * IsNullable<null> = true
 * IsNullable<undefined> = true
 * IsNullable<1> = false
 * IsNullable<string> = false
 * ```
 * @returns 是则返回 `true`，否则为 `false`
 */
export type IsNullable<T> = Extract<T, null | undefined> extends never
    ? false
    : true;
