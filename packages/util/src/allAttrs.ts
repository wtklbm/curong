import { isNullOrUndefined } from '@curong/types';

/**
 * 获取一个值自身的所有属性
 *
 * 该方法会从当前值中获取所有的属性，包括可枚举和不可枚举的，也包括所有的符号属性。
 * 获取到自身属性和符号属性后会将它们连接到一起，返回一个新的字符串属性数组。
 *
 * @param value 包含自身属性的值
 * @return 返回获取到的属性数组
 * @example
 *
 * ```javascript
 *  import { allAttrs } from '@curong/util';
 *
 *  const attrs = allAttrs({a: 1, s: 'str', [Symbol('x')]: 'x'});
 *
 *  console.log(attrs); // [ 'a', 's', 'Symbol(x)' ]
 * ```
 */
export default function allAttrs(value: any): Array<string | symbol> {
    const ret: Array<string | symbol> = [];

    if (isNullOrUndefined(value)) {
        return ret;
    }

    return ret
        .concat(Object.getOwnPropertyNames(value))
        .concat(Object.getOwnPropertySymbols(value));
}
