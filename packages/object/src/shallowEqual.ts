import { hasOwnProperty } from '@curong/types';

import type { ObjectType } from './types';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
const _is = (x: any, y: any) => {
    return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
};

const is = typeof Object.is === 'function' ? Object.is : _is;

/**
 * 通过浅比较的方式比较两个对象中的属性。(仅比较对象中的一层属性)
 *
 * @param objA 一个对象
 * @param objB 另一个对象
 * @param compare 一个返回布尔值的比较函数。默认为 `Object.is`
 * @returns 如果相等则返回 `true`，否则返回 `false`
 * @example ````
 *
 * ### 两个空对象的结果为 `true`
 *
 * ```typescript
 * console.log(shallowEqual({}, {})); // true
 * ```
 *
 * ### 对象中的属性相同结果为 `true`
 *
 * ```typescript
 * const o1 = { name: 'wtklbm' };
 * const o2 = { name: 'wtklbm' };
 *
 * console.log(shallowEqual(o1, o2)); // true
 * ```
 *
 * ### 对象中的属性个数不同结果为 `false`
 *
 * ```typescript
 * const o1 = { name: 'wtklbm' };
 * const o2 = {
 *     name: 'wtklbm',
 *     data: 'text'
 * };
 *
 * console.log(shallowEqual(o1, o2)); // false
 * ```
 *
 * ### 对象中的属性引用地址不同结果为 `false`
 *
 * ```typescript
 * const o1 = {
 *     name: { data: 'wtklbm' }
 * };
 *
 * const o2 = {
 *     name: { data: 'wtklbm' }
 * };
 *
 * console.log(shallowEqual(o1, o2)); // false
 * ```
 *
 * @see https://github.com/facebook/react/blob/2c9fef32db5c9a342a1a60c34217ffc9ae087fbb/packages/shared/shallowEqual.js
 */
export default function shallowEqual<T>(
    objA: ObjectType<T> | null,
    objB: ObjectType<T> | null,
    compare: <T>(objA: T, objB: T, indexOrKey?: number | string) => boolean = is
): boolean {
    if (compare(objA, objB)) {
        return true;
    }

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0, k; i < keysA.length; i++) {
        k = keysA[i];

        if (!hasOwnProperty(objB, k) || !compare(objA[k], objB[k], k)) {
            return false;
        }
    }

    return true;
}
