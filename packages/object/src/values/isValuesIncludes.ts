import { ObjectType } from '../types';

/**
 * 检查指定的值是否存在于给定的对象或类数组对象中
 *
 * @param object 要搜索值的对象或类数组对象
 * @param value 要搜索的值或值的数组
 * @param useAny 如何根据 `value` 数组中的元素来决定函数的返回值
 *  - `true`: 一旦找到匹配项时，该函数就会返回 `true`
 *  - `false`: 仅当所有值都匹配时，该函数才会返回 `true` (默认值)
 * @returns 如果在对象中找到该值 (或数组中的所有值)，则返回 `true`，否则返回 `false`
 * @example
 *
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * console.log(isValuesIncludes(obj, [2, 4])); // false
 * console.log(isValuesIncludes(obj, [2, 4], true)); // true
 * ```
 */
export default function isValuesIncludes(
    object: ObjectType<unknown> | ArrayLike<unknown>,
    value: unknown | unknown[],
    useAny: boolean = false
): boolean {
    const values = new Set(Object.values(object));
    return [value].flat()[useAny ? 'some' : 'every'](v => values.has(v));
}
