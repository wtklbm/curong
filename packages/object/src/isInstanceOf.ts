import type { Class } from '@curong/types';

/**
 * 判断给定的值是否是指定类的实例
 *
 * 该函数通过检查值的原型链来判断其是否为指定类的实例。如果值为 `null` 或 `undefined`，则直接返回 `false`。
 *
 * @param {unknown} value 要检查的值
 * @param {Class<T>} class_ 要检查的类
 * @returns 如果值是指定类的实例则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * class MyClass {}
 * const myInstance = new MyClass();
 *
 * console.log(isInstanceOf(myInstance, MyClass)); // true
 * console.log(isInstanceOf({}, MyClass)); // false
 * console.log(isInstanceOf(null, MyClass)); // false
 * ```
 */
export default function isInstanceOf<T>(
    value: unknown,
    class_: Class<T>
): value is T {
    try {
        return Object.getPrototypeOf(value) === class_.prototype;
    } catch {}

    return false;
}
