import { unifiedIdeograph, hiragana, katakana } from './source';

/**
 * 是否包含中文汉字
 *
 * @param str 要验证的字符串
 * @param vhk 是否在该字符串中不能包含日文(平假名和片假名)
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function inChinese(str: string, vhk: boolean = false): boolean {
    if (vhk && new RegExp(`(${hiragana}|${katakana})+`).test(str)) {
        return false;
    }

    return new RegExp(`(${unifiedIdeograph})+`).test(str);
}
