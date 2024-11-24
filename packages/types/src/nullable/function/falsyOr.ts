import isFalsy from '../../primitive/isFalsy';

/**
 * 如果值为 `falsy`，则返回默认值，否则返回原值
 *
 * 该方法用于在值为 `falsy` 时提供默认值，避免手动检查和赋值。
 *
 * @param value 要检查的值，可能是 `falsy` 值或类型 `T` 的值
 * @param defaultValue 默认值，当 `value` 为 `falsy` 时返回
 * @returns 如果 `value` 为 `falsy`，返回 `defaultValue`，否则返回 `value`
 * @example
 * ```typescript
 * const result = falsyOr(null, 'default');
 * console.log(result); // "default"
 * ```
 * @note
 *  - 该方法检查 `falsy` 值，意味着包括所有被 `JavaScript` 认为是 `falsy` 的值 (如 `false`、`0`、`-0`、`0n`、`''`、`null`、`undefined`、`NaN`)
 *  - 返回的类型与 `value` 类型一致，保证了类型安全
 */
export default function falsyOr<T>(value: unknown, defaultValue: T): T {
    return isFalsy(value) ? defaultValue : (value as T);
}
