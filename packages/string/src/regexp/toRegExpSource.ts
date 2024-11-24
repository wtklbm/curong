/**
 * 转义一个字符串，并让这个字符串通过 `new RegExp()` 方法来创建正则表达式
 *
 * @param str 要转义的字符串
 * @returns 返回转义后的字符串
 * @example
 *
 * ```typescript
 * const ret = toRegExpSource('+');
 * console.log(ret); // '\\+'
 * ```
 */
export default function toRegExpSource(str: string): string {
    // https://262.ecma-international.org/7.0/#sec-patterns
    return str.replace(/(?=[[\](){}^$.?*+|\\/-])/g, '\\');
}
