import isNullOrUndefined from '../isNullOrUndefined';

/**
 * 如果值为 `null` 或 `undefined`，则返回默认值，否则返回原值
 *
 * 该方法用于在值为 `null` 或 `undefined` 时提供默认值，避免手动检查和赋值。
 *
 * @param value 要检查的值，可能是 `null`、`undefined` 或类型 `T` 的值
 * @param defaultValue 默认值，当 `value` 为 `null` 或 `undefined` 时返回
 * @returns 如果 `value` 为 `null` 或 `undefined`，返回 `defaultValue`，否则返回 `value`
 * @example
 * ```typescript
 * const result = nullableOr(null, 'default');
 * console.log(result); // "default"
 * ```
 * @note
 *  - 如果您不想使用该方法，则可以使用 ES 的 `??` 语法
 *  - 该方法仅检查 `null` 或 `undefined`，对于其他值 (如 `false`、`0`、`''`) 会直接返回原值
 *  - 返回的类型与 `value` 类型一致，保证了类型安全
 */
export default function nullableOr<T>(value: unknown, defaultValue: T): T {
    return isNullOrUndefined(value) ? defaultValue : (value as T);
}
