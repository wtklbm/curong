/**
 * 转义一个字符串，并让这个字符串通过 `new RegExp()` 方法来创建正则表达式
 *
 * @param str 要转义的字符串
 * @returns 返回转义后的字符串
 */
export default function toRegExpSource(str: string): string {
    if (typeof str !== 'string') {
        throw new TypeError(`[toRegExpSource]: str不是一个字符串, "${str}"`);
    }

    return str.replace(/(?=[[\](){}^$.?*+|\\/-])/g, '\\');
}
