import { isZero } from '@curong/types';

/**
 * 遍历一组正则表达式来验证一个字符串，当任意一个正则表达式符合字符串时，
 * 则返回该正则捕获到的结果，这个方法的主要目的是控制正则捕获的先后顺序。
 *
 * @param str 要查找的字符串
 * @param regexps 正则数组
 * @returns 返回捕获到的结果或者是 `null`
 */
export default function matchOrder(
    str: string,
    regexps: RegExp[]
): RegExpMatchArray | null {
    let match: RegExpMatchArray | null = null;

    if (!isZero(str) || !isZero(regexps.length)) {
        return match;
    }

    for (let i = 0, len = regexps.length; i < len; i++) {
        if ((match = str.match(regexps[i]))) {
            break;
        }
    }

    return match;
}
