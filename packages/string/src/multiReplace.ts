import { isArray } from '@curong/types';

/**
 * 根据一组规则替换字符串的内容
 *
 * @param value 要处理的值
 * @param matchers 匹配器，如果匹配则进行替换
 * @example
 *
 * ```javascript
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
        RegExp | string,

        /** 要替换的值；或指定一个替换函数，返回替换好的值 */
        string | ((substring: string, ...args: any[]) => string)
    ][]
): string;

/**
 * 根据一组规则替换字符串的内容
 *
 * @param value 要处理的值
 * @param matchers 匹配器，如果匹配则进行替换
 * @example
 *
 * ```javascript
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
        match: RegExp | string;

        /** 要替换的值；或指定一个替换函数，返回替换好的值 */
        replacer: string | ((substring: string, ...args: any[]) => string);
    }[]
): string;

export default function multiReplace(value: string, matchers: any): string {
    return matchers.reduce((memo: string, matcher: any) => {
        if (isArray(matcher)) {
            return memo.replace(matcher[0], matcher[1]);
        }

        return memo.replace(matcher.match, matcher.replacer);
    }, value);
}
