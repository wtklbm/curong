import getTag from './getTag';

/**
 * 是不是一个正则表达式
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @polyfill
 * ```javascript
 * if (isNullOrUndefined(value)) {
 *     return false;
 * }
 *
 * // `lastIndex` 是正则的一个可读可写不可枚举不可配置的整数，
 * // 它用来指定下一次匹配的起始索引。
 * const { value: val, writable, enumerable, configurable } =
 *     Object.getOwnPropertyDescriptor(value, 'lastIndex') || {};
 *
 * // 如果 `lastIndex` 的值符合预期并且有带有一个参数的 `exec` 方法
 * if (
 *     isNumberInt(val) &&
 *     val >= 0 &&
 *     writable === true &&
 *     enumerable === false &&
 *     configurable === false &&
 *     isPrototypeProperty(value, 'exec') &&
 *     value.exec.length === 1
 * ) {
 *     // 保留原始的值，防止执行 `exec` 方法后被篡改
 *     const lastIndex = value.lastIndex;
 *
 *     // 执行 `exec` 方法，判断值是否为对象
 *     try {
 *         const str = 'x-1._ $\r\n\t\\';
 *         value.lastIndex = 0;
 *         const res = value.exec(str);
 *
 *         if (
 *             isNull(res) ||
 *             (typeof isObject(res) &&
 *                 isString(res[0]) &&
 *                 res.input === str)
 *         ) {
 *             value.lastIndex = lastIndex;
 *
 *             return true;
 *         }
 *     } catch (_e) {
 *         value.lastIndex = lastIndex;
 *     }
 * }
 *
 * return false;
 * ```
 */
export default function isRegExp(value: any): value is RegExp {
    return getTag(value) === 'RegExp';
}
