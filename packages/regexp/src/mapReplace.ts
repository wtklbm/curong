/**
 * 使用一组正则表达式来替换字符串中的内容
 *
 * @param regexps 要使用的正则表达式数组
 * @param value 原始字符串值
 * @param replacer 一个字符串，可以直接替换为一个值，或使用小分组(`$1`、`$2`)来替换
 * @returns 返回替换好的值
 */
export default function mapReplace(
    regexps: RegExp[],
    value: string,
    replaceValue: string
): string;

/**
 * 使用一组正则表达式来替换字符串中的内容
 *
 * @param regexps 要使用的正则表达式数组
 * @param value 原始字符串值
 * @param replacer 一个替换函数，第一个参数是捕获到的值，后面的参数是一个或多个小分组，
 *   然后是匹配到的值的索引，最后一个参数是原始字符串
 * @returns 返回替换好的值
 */
export default function mapReplace(
    regexps: RegExp[],
    value: string,
    replacer: (substring: string, ...args: any[]) => string
): string;

export default function mapReplace(
    regexps: RegExp[],
    value: string,
    replacer: any
): string {
    return regexps.reduce(
        (memo, regexp) => memo.replace(regexp, replacer),
        value
    );
}
