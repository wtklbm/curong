import { isNumber, isSymbol } from '@curong/types';

import type { ObjectType } from '../types';

/**
 * 将一个对象中的键全部转换为小写，并返回一个新的对象
 *
 * @param object 要处理的对象
 * @param isCover 当遇到重复对象名时是否覆盖之前的属性，默认为 `true`
 *
 *  - 如果为 `true`，则会将新对象中之前所存储的属性中的值替换掉
 *  - 如果为 `false`，则不会对新对象中的属性重复赋值
 *
 * @returns 返回处理好的新的对象
 * @example
 *
 * ```typescript
 * let ret = toLowerCaseKey({ name: 1, NAME: 2 });
 * console.log(ret); // { name: 2 }
 * ret = toLowerCaseKey({ name: 1, NAME: 2 }, false);
 * console.log(ret); // { name: 1 }
 * ```
 */
export default function toLowerCaseKey(
    object: ObjectType,
    isCover: boolean = true
): ObjectType {
    const set = new Set();

    return Reflect.ownKeys(object).reduce((memo, key) => {
        const value = object[key];

        // 如果属性名是数字或者 `symbol`，就直接赋值
        if (isSymbol(key) || isNumber(key)) {
            memo[key] = value;
            return memo;
        }

        key = key.toLocaleLowerCase();

        if (isCover) {
            memo[key] = value;
        } else if (!set.has(key)) {
            memo[key] = value;
            set.add(key);
        }

        return memo;
    }, {} as ObjectType);
}
