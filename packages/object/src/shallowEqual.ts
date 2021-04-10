import { ObjectType } from './types/objectType';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
const _is = (x: any, y: any) => {
    return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
};

const is = typeof Object.is === 'function' ? Object.is : _is;
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 通过浅比较的方式比较两个对象中的属性。(仅比较对象中的一层属性)
 *
 * @param objA 一个对象
 * @param objB 另一个对象
 * @returns 如果相等则返回 `true`，否则返回 `false`
 * @example ````
 *
 * ### 两个空对象的结果为 `true`
 *
 * ```javascript
 * console.log(shallowEqual({}, {})); // true
 * ```
 *
 * ### 对象中的属性相同结果为 `true`
 *
 * ```javascript
 * const o1 = { name: 'wtklbm' };
 * const o2 = { name: 'wtklbm' };
 *
 * console.log(shallowEqual(o1, o2)); // true
 * ```
 *
 * ### 对象中的属性个数不同结果为 `false`
 *
 * ```javascript
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
 * ```javascript
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
export default function shallowEqual(
    objA: ObjectType | null,
    objB: ObjectType | null
): boolean {
    if (is(objA, objB)) {
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

    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }

    return true;
}
