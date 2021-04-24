/**
 * 根据英文首字母排序
 *
 * @param value 要排序的英文单词数组
 * @param reverseOrder 是否倒序排列，默认为 `false`
 * @returns 返回排序好的内容
 * @example
 *
 * ```javascript
 * const value = ['ae', 'aa', 'ac', 'cg', 'do', 'gj', 'bl'];
 * const ret1 = sortByEngInitials(value);
 * console.log(ret1); // ['ae', 'aa', 'ac', 'bl', 'cg', 'do', 'gj'];
 *
 * const ret2 = sortByEngInitials(value, true);
 * console.log(ret2); // ['gj', 'do', 'cg', 'bl', 'ae', 'aa', 'ac'];
 * ```
 */
export default function sortByEngInitials(
    value: string[],
    reverseOrder = false
): string[] {
    if (reverseOrder) {
        return value.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
    }

    return value.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
}
