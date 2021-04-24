/**
 * 给单词数组排序，中文按照音序排序，英文按照整个单词排序 (全量排序)
 *
 * @param value 要排序的字符串数组
 * @returns 返回排序好的字符串数组
 * @example
 *
 * ```javascript
 * const value = ['中', 'this', '国', 'is', 'test', 'a'];
 * const ret = sortWords(value);
 * console.log(ret); // [ '国', '中', 'a', 'is', 'test', 'this' ]
 * ```
 */
export default function sortWords(value: string[]): string[] {
    return value.sort((a, b) => a.localeCompare(b));
}
