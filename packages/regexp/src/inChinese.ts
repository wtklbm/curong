import { hiragana, katakana, unifiedIdeograph } from './source';

/**
 * 是否包含中文汉字
 *
 * @param str 要验证的字符串
 * @param vhk 是否在该字符串中不能包含日文(平假名和片假名)，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = inChinese('hello，中国');
 * console.log(ret); // true
 * ```
 */
export default function inChinese(str: string, vhk: boolean = false): boolean {
    if (vhk && new RegExp(`(${hiragana}|${katakana})+`).test(str)) {
        return false;
    }

    return new RegExp(`(${unifiedIdeograph})+`).test(str);
}
