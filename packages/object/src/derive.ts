import { isUndefined } from '@curong/types';

import type { ObjectType } from './types';

/**
 * 基于一个对象派生出和它长得一模一样的对象。在派生出的对象中，它的属性和 `obj` 是完全一样的。
 *
 * 需要注意的是，对象的派生操作不是深拷贝，而是进行了浅拷贝。
 * 并且，在派生的时候，也是仅仅处理 `obj` 顶层的属性，并没有涉及到递归操作。
 * 如果想对对象进行深拷贝的话，请使用 `@curong/util` 下面的 `copy` 方法。
 *
 * @param obj 基于哪个对象派生
 * @param deleteKeys 要从对象中删除哪个属性，删除的属性将不在派生的对象中存在
 * @returns 返回派生好的对象
 * @example
 *
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3, d: { e: true } };
 * const ret = derive(obj);
 *
 * // { a: 1, b: 2, c: 3, d: { e: true } }
 * console.log(ret);
 * console.log(ret.d === obj.d); // true
 * ```
 */
export default function derive<T extends ObjectType>(
    obj: T,
    deleteKeys?: Array<keyof T>
) {
    const ret = Object.create(Object.getPrototypeOf(obj));
    const keysSet: Set<PropertyKey> = new Set(deleteKeys);
    const objKeys = Reflect.ownKeys(obj);
    let key: PropertyKey | undefined;

    while (!isUndefined((key = objKeys.shift()))) {
        if (!keysSet.has(key)) {
            Object.defineProperty(
                ret,
                key,
                Object.getOwnPropertyDescriptor(obj, key)!
            );
        }
    }

    return ret;
}
