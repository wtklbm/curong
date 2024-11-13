import isNullOrUndefined from '../nullable/isNullOrUndefined';

const { prototype } = Object;

/**
 * 是不是一个构造函数的原型对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * 在 `JavaScript` 中，几乎所有的内置构造函数 (如 `Object`, `Array`, `Function` 等) 都有一个 `prototype` 属性。
 * 这个属性指向一个对象，该对象包含了该构造函数的所有实例共享的方法和属性。
 *
 * ### 原生值没有 `prototype` 属性
 *
 * 以下内容不具有 prototype 属性：
 *  - `undefined`
 *  - `null`
 *  - `boolean` (`true`, `false`)
 *  - `number` (如 `1`, `2.5`)
 *  - `string` (如 `'hello'`)
 *  - `symbol` (如 `Symbol('symbol')`)
 *
 * 原始值是不可变的，它们没有 `prototype` 属性。虽然它们的包装对象 (如 `Boolean`, `Number`, `String`) 有 `prototype` 属性，但这些包装对象并不是原始值本身。
 */
export default function isPrototype<T = unknown>(value: unknown): value is T {
    return (
        !isNullOrUndefined(value) &&
        value === ((value as any).constructor?.prototype ?? prototype)
    );
}
