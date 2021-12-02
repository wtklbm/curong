import { isNullOrUndefined } from '@curong/types';

import copy from './copy';
import allAttrs from './allAttrs';
import lackAttrs from './lackAttrs';

/**
 * 把一个值中的自身属性深度拷贝到另一个值上
 *
 * @param src 源对象
 * @param dest 目标对象
 * @param lacked 是否仅仅深度拷贝当前值中没有的一些自身属性，默认为 `false`。
 *   如果 `lacked` 的值为 `true`，则仅仅克隆源对象有但目标对象中没有的那些自身属性。
 *   否则会将源对象中的所有属性拷贝到目标对象上。
 * @returns 返回拷贝好属性的值
 * @example
 *
 * ```javascript
 *  import { copyAttrs } from '@curong/util';
 *
 *  const obj1 = copyAttrs({a: 1, s: 'str'}, { a: 2, x: 'x' }, true);
 *  console.log(obj1); // {a: 2, x: 'x', s: 'str'}
 *
 *  const obj2 = copyAttrs({a: 1, s: 'str'}, { a: 2, x: 'x' }, false);
 *  console.log(obj2); // {a: 1, x: 'x', s: 'str'}
 * ```
 */
export default function copyAttrs(
    src: any,
    dest: any,
    lacked: boolean = false
) {
    if (isNullOrUndefined(src) || isNullOrUndefined(dest)) {
        return dest;
    }

    const attrs = allAttrs(src);

    return (lacked ? lackAttrs(dest, attrs) : attrs).reduce((memo, key) => {
        memo[key] = copy(src[key]);
        return memo;
    }, dest);
}
