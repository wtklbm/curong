/**
 * 按照单词的所有字母全量排序
 *
 * @param value 要排序的单词数组
 * @param reverseOrder 是否倒序排列，默认为 `false`
 * @returns 返回排序好的内容
 * @example
 *
 * ```javascript
 * const value = ['ae', 'aa', 'ac', 'cg', 'do', 'gj', 'bl'];
 * const ret1 = sortByEng(value);
 * console.log(ret1); // ['aa', 'ac', 'ae', 'bl', 'cg', 'do', 'gj'];
 *
 * const ret2 = sortByEng(value, true);
 * console.log(ret2); // ['gj', 'do', 'cg', 'bl', 'ae', 'ac', 'aa'];
 * ```
 */
export default function sortByEng(
    value: string[],
    reverseOrder = false
): string[] {
    let f = (a: any, b: any) => a > b;

    if (reverseOrder) {
        f = (a, b) => a < b;
    }

    return value.sort((a, b) => (f(a, b) ? 1 : -1));
}
