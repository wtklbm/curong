import { isUndefined } from '@curong/types';

import derive from './derive';

import { ObjectType } from './types/objectType';

/**
 * 从一个对象中删除一些属性
 *
 * @param obj 对象
 * @param deleteKeys 要从对象中的删除的属性字符串数组
 * @returns 返回处理好的对象
 * @example
 *
 * ```javascript
 * let obj = { a: 1, b: 2, c: 3 };
 * // 请在删除属性时接受该函数的返回值
 * obj = deleteAttrs(obj, ['b']);
 * console.log(obj); // { a: 1, c: 3 }
 * ```
 */
export default function deleteAttrs<T extends ObjectType>(
    obj: T,
    deleteKeys: Array<keyof T>
): T {
    let key: PropertyKey | undefined;

    while (!isUndefined((key = deleteKeys.pop()))) {
        if (!Reflect.deleteProperty(obj, key)) {
            deleteKeys.push(key as keyof T);

            return derive(obj, deleteKeys);
        }
    }

    return obj;
}
