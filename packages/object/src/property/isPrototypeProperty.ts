import { hasOwnProperty, isTypeofObject } from '@curong/types';

/**
 * 是不是当前对象的原型上的属性
 *
 * @param object 要判断的对象
 * @param key 要判断的属性名
 * @returns 如果是则返回 `true`，否则为 `false`
 * @note 不是私有的并且在原型上就是当前对象的原型上的属性
 * @example
 *
 * ```typescript
 * class Arr extends Array {
 *     constructor() {
 *         super()
 *     }
 *
 *     private sortBy() { }
 *
 *     static sortByKey() { }
 * }
 *
 * const arr = new Arr;
 * console.log(isPrototypeProperty(arr, 'slice')); // true
 * console.log(isPrototypeProperty(arr, 'sortBy')); // true
 * console.log(isPrototypeProperty(arr, 'sortByKey')); // false
 * ```
 */
export default function isPrototypeProperty(object: any, key: string): boolean {
    return (
        isTypeofObject(object) && !hasOwnProperty(object, key) && key in object
    );
}
