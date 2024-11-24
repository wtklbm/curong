import isUndefined from '../isUndefined';

/**
 * 如果值为 `undefined`，则返回默认值，否则返回原值
 *
 * 该方法用于在值为 `undefined` 时提供默认值，避免手动检查和赋值。
 *
 * @param value 要检查的值，可能是 `undefined` 或类型 `T` 的值
 * @param defaultValue 默认值，当 `value` 为 `undefined` 时返回
 * @returns 如果 `value` 为 `undefined`，返回 `defaultValue`，否则返回 `value`
 * @example
 * ```typescript
 * const result = undefinedOr(undefined, 'default');
 * console.log(result); // "default"
 * ```
 * @note
 *  - 该方法只检查 `undefined`，对于 `null` 或其他 `falsy` 值 (如 `false`、`0`、`''`)，会直接返回原值
 *  - 返回的类型与 `value` 类型一致，保证了类型安全
 */
export default function undefinedOr<T>(value: unknown, defaultValue: T): T {
    return isUndefined(value) ? defaultValue : (value as T);
}
