import { source } from '@curong/regexp';
import { isFunction } from '@curong/types';

/** 验证所有标点符号和一个空格 */
const punctuationReg = new RegExp(`${source.punctuation}| `);

/**
 * 在正则表达式捕获到的第一项值的左侧和右侧补全空格
 *
 * @param substring 正则表达式捕获到的第一项
 * @param _matches 正则表达式捕获到的结果
 * @param leftChar 捕获到的第一项值的左侧的字符
 * @param rightChar 捕获到的第一项值的右侧的字符
 * @returns 返回补全了空格的字符串
 */
const fillingSpaces = (
    substring: string,
    _matches: any[],
    leftChar: string,
    rightChar: string
): string => {
    if (leftChar && !punctuationReg.test(leftChar)) {
        substring = ' ' + substring;
    }

    if (rightChar && !punctuationReg.test(rightChar)) {
        substring += ' ';
    }

    return substring;
};

/**
 * 基于正则所匹配到的结果添加适当的空格
 *
 * @param value 要处理的字符串
 * @param regexp 正则表达式
 * @param handleMatch 处理函数，它接收正则所匹配的第一项的值和正则所匹配的结果并返回新的子串
 * @example
 *
 * ```javascript
 * // 为捕获到的值添加反引号和空格。
 * subSpaces('有100本书。', /\d+/, v => '`' + v + '`'); // 有 `100` 本书。
 * ```
 *
 * @returns 返回补全了空格的字符串
 */
export default function subSpaces(
    value: string,
    regexp: RegExp,
    handleMatch?: (substring: string, matches: any[]) => string
): string {
    let repair = fillingSpaces;

    if (isFunction(handleMatch)) {
        repair = (s, m, l, r) => fillingSpaces(handleMatch(s, m), m, l, r);
    }

    return value.replace(regexp, (...matches) => {
        let substring = matches[0];
        const value = matches[matches.length - 1];
        const index = matches[matches.length - 2];
        const leftChar = value[index - 1];
        const rightChar = value[index + substring.length];

        return repair(substring, matches, leftChar, rightChar);
    });
}
