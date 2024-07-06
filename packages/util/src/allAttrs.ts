import { isNullOrUndefined } from '@curong/types';

/**
 * 获取一个值自身的所有属性
 *
 * 该方法会从当前值中获取所有的属性，包括可枚举和不可枚举的，也包括所有的符号属性。
 * 获取到自身属性和符号属性后会将它们连接到一起，返回一个新的字符串属性数组。
 *
 * ### `Reflect.ownKeys` 方法
 *
 * `Reflect.ownKeys` 方法是用来获取一个值上包含 `Symbol` 的所有的属性的方法，它等价于
 * `Object.getOwnPropertyNames(value)` 和 `Object.getOwnPropertySymbols(value)` 结果的集合。
 *
 * @param value 包含自身属性的值
 * @return 返回获取到的属性数组
 * @example
 *
 * ```typescript
 *  console.log(allAttrs({a: 1, s: 'str', [Symbol('x')]: 'x'})); // [ 'a', 's', 'Symbol(x)' ]
 * ```
 */
export default function allAttrs(value: any): PropertyKey[] {
    if (isNullOrUndefined(value)) {
        return [];
    }

    return Reflect.ownKeys(value);
}
