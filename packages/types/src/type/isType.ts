/**
 * 通过泛型声明来判断是不是某一个类型的值
 *
 * @param value 要验证的值
 * @returns 该方法验证任何值都会返回 `true`
 * @example
 *
 * ```typescript
 * const v: unknown = undefined;
 *
 * // 在这里点不出来东西
 * //v != null && v.
 *
 * // 可以点出东西
 * v != null && isType<string>(v) && v.
 * ```
 */
export default function isType<T>(value: any): value is T {
    return true;
}
