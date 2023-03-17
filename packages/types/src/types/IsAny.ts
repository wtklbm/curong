/**
 * 是不是一个 `any` 类型的值
 *
 * @typeParam T 要验证的值
 * @example
 *
 * ```typescript
 * IsAny<any> = true
 * IsAny<1> = false
 * IsAny<string> = false
 * ```
 * @returns 是则返回 `true`，否则为 `false`
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
