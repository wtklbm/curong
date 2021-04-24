/**
 * 给单词数组排序，中文按照音序排序，英文按照整个单词排序 (全量排序)
 *
 * @param value 要排序的字符串数组
 * @param reverseOrder 是否倒序排列，默认为 `false`
 * @returns 返回排序好的字符串数组
 * @example
 *
 * ```javascript
 * const value = ['中', 'this', '国', 'is', 'test', 'a'];
 * const ret1 = sortWords(value);
 * console.log(ret1); // [ '国', '中', 'a', 'is', 'test', 'this' ]
 *
 * const ret2 = sortWords(value, true);
 * console.log(ret2); // [ 'this', 'test', 'is', 'a', '中', '国' ]
 * ```
 */
export default function sortWords(
    value: string[],
    reverseOrder = false
): string[] {
    if (reverseOrder) {
        return value.sort((a, b) => b.localeCompare(a));
    }

    return value.sort((a: any, b: any) => a.localeCompare(b));
}
