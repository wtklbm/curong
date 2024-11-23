import { isNullOrUndefined } from '@curong/types';

import type { Constructor } from './types';

/**
 * 获取一个值的构造函数
 *
 * @param value 要使用的值
 * @returns 如果当前值有构造返回则返回当前值的构造函数，否则返回 `null`
 * @example
 *
 * ```typescript
 * const ret = constructor('');
 * console.log(ret); // [Function: String]
 * ```
 *
 * @note
 * 该方法使用 `Object.getPrototypeOf` 来获取对象的原型。在项目中，除了该方法可以获取原型外，
 * 还可以使用 `Reflect.getPrototypeOf`。`Reflect.getPrototypeOf` 接受一个目标对象，
 * 如果传递的参数不是一个对象的话，就会抛出异常。
 */
export default function constructor<T extends {}>(
    value: unknown
): Constructor<T> | null {
    return isNullOrUndefined(value)
        ? null
        : (Object.getPrototypeOf(value)?.constructor ?? null);
}
