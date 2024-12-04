import { keys } from '../keys';
import type { ObjectType } from '../types';

/**
 * 清空对象的所有属性并返回操作结果
 *
 * 该函数根据指定的方法级别获取对象的属性键，并尝试删除这些属性。
 * 删除操作会直接修改原对象并返回一个布尔值，指示是否所有属性都被成功删除。
 *
 * @param object 要操作的对象或类数组对象
 * @param methodLevel 通过不同的方法获取对象的属性，默认值为 `0`
 *  - `0`: 使用 `Object.keys`，只包含可枚举属性 (默认值)
 *  - `1`: 使用 `Object.getOwnPropertyNames`，包含可枚举属性和不可枚举属性
 *  - `2`: 使用 `Object.getOwnPropertySymbols`，只包含 `Symbol` 属性
 *  - `3`: 使用 `Reflect.ownKeys`，包含可枚举属性、不可枚举属性和 `Symbol` 属性
 * @returns 返回一个布尔值，表示对象的所有属性是否成功删除。
 *  删除不可配置属性将返回 `false`，建议谨慎处理不可枚举或只读属性
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, [Symbol('c')]: 3 };
 * clearObject(obj);
 * console.log(obj); // {}
 *
 * const obj2 = Object.defineProperty({}, 'a', { value: 1, enumerable: false });
 * clearObject(obj2, 1);
 * console.log(obj2); // {}
 *
 * const sym = Symbol('key');
 * const obj3 = { [sym]: 42 };
 * clearObject(obj3, 2);
 * console.log(obj3); // {}
 *
 * const obj4 = { a: 1, b: 2, [Symbol('c')]: 3 };
 * clearObject(obj4, 3);
 * console.log(obj4); // {}
 * ```
 */
export default function clearObject<T>(
    object: ObjectType<T>,
    methodLevel: 0 | 1 | 2 | 3 = 0
): boolean {
    return keys(object, methodLevel).every(key =>
        Reflect.deleteProperty(object, key)
    );
}

const obj = Object.create(null, {
    a: { value: 1, enumerable: true, configurable: true },
    b: { value: 2, enumerable: true, configurable: false }
});
const result = clearObject(obj, 1);
console.log(result, obj);
