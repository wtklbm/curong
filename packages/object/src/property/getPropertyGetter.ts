import getProperty from './getProperty';

/**
 * 传递一个属性名，并返回一个新的函数，该函数可用于从对象中提取该属性的值
 *
 * @param key 要使用的属性名，可以是字符串、数字或 `Symbol`
 * @returns 返回一个新的函数，该函数接受一个对象并返回指定属性的值。
 *  如果传入的对象为 `null` 或 `undefined`，则返回 `undefined`。
 * @example
 *
 * ```typescript
 * const getName = getPropertyGetter('name');
 * console.log(getName({ name: 'Alice' })); // Alice
 * console.log(getName({})); // undefined
 * console.log(getName(null)); // undefined
 *```
 */
export default function getPropertyGetter(key: PropertyKey) {
    return <T>(obj: T) => getProperty(obj, key);
}
