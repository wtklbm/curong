/** 基本类型的类型定义 */
export type Primitive =
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined;

/**
 * 是不是一个基本类型的值
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @info 7种基本类型：`string`，`number`，`bigint`，`boolean`，`null`，`undefined`，`symbol`。
 * 所有基本类型的值都是不可改变的。基本类型直接代表了最底层的语言实现。
 * 除了 `null` 和 `undefined` 之外，所有基本类型都有其对应的包装对象。
 * 这个包裹对象的 `valueOf()` 方法返回基本类型值。
 */
export default function isPrimitive(value: unknown): value is Primitive {
    return typeof value === 'object'
        ? value === null
        : typeof value !== 'function';
}
