import { isArray } from '@curong/types';

type Match = string | RegExp;
type Replacer = string | ((substring: string, ...args: unknown[]) => string);
type Matcher = [Match, Replacer] | { match: Match; replacer: Replacer };

/**
 * 根据一组规则替换字符串的内容
 *
 * @param value 要处理的值
 * @param matchers 匹配器，如果匹配则进行替换
 * @example
 *
 * ```typescript
 * const ret = replace('this is good.', [
 *     [ /this/, 'book' ],
 *     [ /good/, v => v.toUpperCase() ]
 * ]);
 * console.log(ret); // book is GOOD.
 * ```
 */
export default function multiReplace(
    value: string,
    matchers: [
        /**
         * - `string`: 只能匹配一次
         * - `RegExp`: 可以匹配一次，也可以匹配多次
         */
        Match,

        /** 要替换的值；或指定一个替换函数，返回替换好的值 */
        Replacer
    ][]
): string;

/**
 * 根据一组规则替换字符串的内容
 *
 * @param value 要处理的值
 * @param matchers 匹配器，如果匹配则进行替换
 * @example
 *
 * ```typescript
 * const ret = replace('this is good.', [
 *     {
 *         match: /this/,
 *         replacer: 'book'
 *     },
 *     {
 *         match: /good/,
 *         replacer: v => v.toUpperCase()
 *     }
 * ]);
 *
 * console.log(ret); // book is GOOD.
 * ```
 */
export default function multiReplace(
    value: string,
    matchers: {
        /**
         * - `string`: 只能匹配一次
         * - `RegExp`: 可以匹配一次，也可以匹配多次
         */
        match: Match;

        /** 要替换的值；或指定一个替换函数，返回替换好的值 */
        replacer: Replacer;
    }[]
): string;

export default function multiReplace(
    value: string,
    matchers: Matcher[]
): string {
    return matchers.reduce((memo: string, matcher: Matcher) => {
        return memo.replace(
            ...((isArray(matcher)
                ? [matcher[0], matcher[1]]
                : [matcher.match, matcher.replacer]) as [Match, any])
        );
    }, value);
}
