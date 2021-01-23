/** 获取字符串开头多个空格的正则表达式 */
const startSpacesReg = /^ +/;

/**
 * 获取字符串开头所包含的空格的数量
 *
 * @param str 查找哪个字符串中的空格
 * @returns 返回字符串开头所找到的空格数
 */
export default function startSpacesLength(str: string): number {
    const match = str.match(startSpacesReg);

    return match ? match[0].length : 0;
}
