/**
 * **简单** 的判断多个的值是否不相等
 *
 * 基本类型会比较值是否相等，引用类型会比较引用是否相等。
 *
 * @param value 当前值
 * @param args 要跟当前值比较的多个值
 * @returns 不相等返回 `true`，否则为 `false`
 *  - 如果 `args` 为空数组，则返回 `false`
 */
export default function isNotEqual<T extends unknown[]>(
    value: unknown,
    ...args: T
): boolean {
    const handle = Number.isNaN(value)
        ? (v: unknown) => !Number.isNaN(v)
        : (v: unknown) => value !== v;

    return !!args.length && args.every(handle);
}
