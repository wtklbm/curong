/** 获取字符串开头多个 `Tab` 的正则表达式 */
const startTabsReg = /^\t+/;

/**
 * 获取字符串开头所包含的 `Tab` 的数量
 *
 * @param str 查找哪个字符串中的 `Tab`
 * @returns 返回字符串开头所找到的 `Tab` 数
 */
export default function startTabsLength(str: string): number {
    const match = str.match(startTabsReg);

    return match ? match[0].length : 0;
}
