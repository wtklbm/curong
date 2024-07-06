import { isRegExp, isUint, isZero } from '@curong/types';

/**
 * 使用正则表达式来拆分一个字符串，最后返回拆分后的结果
 *
 * 返回的字符串数组中包含 `3` 个值：
 * - `0` 该值的前面的字符串切片
 * - `1` 匹配到的值
 * - `2` 该值的后面的字符串切片
 *
 * @param str 要匹配的字符串
 * @param reg 要使用的正则表达式
 * @returns 如果成功匹配则返回字符串拆分后的结果，否则返回空数组。
 *          如果返回的是空数组，那么在解构值的时候就需要判断值是否是 `undefined` 了。
 *
 * @example
 *
 * ```typescript
 * const ret = matchSplit('wtklbm123abc', /\d+/);
 * console.log(ret); // [ 'wtklbm', '123', 'abc' ]
 * ```
 */
export default function matchSplit(str: string, reg: RegExp): string[] {
    const res: string[] = [];
    let match: RegExpMatchArray | null = null;

    if (isZero(str.length) || !isRegExp(reg)) {
        return res;
    }

    if ((match = str.match(reg)) && isUint(match.index)) {
        res.push(str.slice(0, match.index));
        res.push(match[0]);
        res.push(str.slice(match.index + match[0].length));
    }

    return res;
}
