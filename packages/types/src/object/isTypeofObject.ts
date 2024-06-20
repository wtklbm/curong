import { isNull } from '..';

/**
 * 使用 `typeof` 判断是不是一个不是 `null` 的任意对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *   该方法利用 `typeof` 判断是不是对象、数组、类数组、正则等等。
 *   比如 `Array`、`Date`、`Regexp` 等使用该方法均返回 `true`。
 *
 * @note
 *
 * - 如果想验证 `[object Object]` 的对象，请使用 `isObject` 方法
 * - 如果想验证一个普通对象，即 `{}`，请使用 `isPlainObject` 方法
 * - 如果想验证纯对象 (通过 `Object.create(null)` 创建的对象)，请使用 `isPureObject` 方法
 *
 *
 * #### `null` 既是对象，又不是对象，史称「薛定谔的对象」
 *
 * - `typeof null === 'object'` 的结果为 `true`。`null` 是空指针对象。
 * - `null instanceof Object === false` 的结果为 `true`
 */
export default function isTypeofObject<T extends Object>(
    value: any
): value is T {
    return typeof value === 'object' && !isNull(value);
}
