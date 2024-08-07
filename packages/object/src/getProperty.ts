import { isNullOrUndefined } from '@curong/types';

/**
 * 获取属性的值
 *
 * @param obj 从哪个对象中获取属性值
 * @param key 要使用的属性名，可以是字符串、数字或 `Symbol`
 * @returns 返回属性的值。如果传入的对象为 `null` 或 `undefined`，则返回 `undefined`
 * @example
 *
 * ```typescript
 * console.log(getProperty({ name: 'Alice' }, 'name')); // Alice
 * console.log(getProperty({ age: 10 }, 'name')); // undefined
 * console.log(getProperty(undefined, 'name')); // undefined
 * console.log(getProperty(null, 'name')); // undefined
 *```
 */
function getProperty<O, K extends keyof O>(
    obj: O,
    key: K
): O[K] extends undefined ? undefined : O[K];

function getProperty<O, R>(obj: O, key: PropertyKey): unknown;

function getProperty(obj: any, key: PropertyKey) {
    return isNullOrUndefined(obj)
        ? undefined
        : (obj as Record<PropertyKey, any>)[key];
}

export default getProperty;
