import { isUndefined } from '@curong/types';

import { ObjectType } from './types/objectType';

/**
 * 从一个对象中删除一些属性
 *
 * @param obj 对象
 * @param keys 要从对象中的删除的属性字符串数组
 * @returns 返回处理好的对象
 */
export default function deleteAttrs<T extends ObjectType>(
    obj: T,
    keys: Array<keyof T>
): T {
    let key: PropertyKey | undefined;

    try {
        while (!isUndefined((key = keys.shift()))) {
            delete obj[key as keyof ObjectType];
        }

        return obj;
    } catch (e) {}

    const ret = Object.create(Object.getPrototypeOf(obj));
    const keysSet: Set<PropertyKey> = new Set(keys);
    const objKeys = Object.getOwnPropertyNames(obj);

    while (!isUndefined((key = objKeys.shift()))) {
        // @ts-ignore
        if (!keysSet.has(key)) {
            Object.defineProperty(
                ret,
                key!,
                // @ts-ignore
                Object.getOwnPropertyDescriptor(obj, key)
            );
        }
    }

    return ret;
}
