import { isArrayHave, isNullOrUndefined } from '@curong/types';

import allAttrs from './allAttrs';

/**
 * 检测一个值的自身属性中是否缺少某些属性
 *
 * 该方法会检测值的自身属性和符号属性，然后进行比对。
 *
 * @param value 要检测的值
 * @param attributes 要对比的属性集合
 * @return 返回缺少的属性
 * @example
 *
 * ```javascript
 *  import { lackAttrs } from '@curong/util';
 *
 *  const attrs = lackAttrs({ a: 1, s: 's' }, ['a', 'b', 'c']);
 *
 *  console.log(attrs); // [ 'b', 'c' ]
 * ```
 */
export default function lackAttrs(
    value: any,
    attributes: Array<string | number | symbol>
): Array<string | number | symbol> {
    if (isNullOrUndefined(value) || !isArrayHave(attributes)) {
        return [];
    }

    const attrSet = new Set(allAttrs(value));

    return attributes.filter(v => !attrSet.has(v));
}
