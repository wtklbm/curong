import { japanese } from './source';

/**
 * 是否包含日文
 *
 * @param str 要验证的字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @info 日文中包含汉字，所以用该方法验证汉字也返回 `true`
 * @example
 *
 * ```javascript
 * const ret = inJapanese('こんにちは中国');
 * console.log(ret); // true
 * ```
 */
export default function inJapanese(str: string) {
    return new RegExp(`${japanese}+`).test(str);
}
