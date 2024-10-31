import { japanese } from './source';

let _: RegExp;

/**
 * 是否包含日文
 *
 * @param str 要验证的字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @note 日文中包含汉字，所以用该方法验证汉字也返回 `true`
 * @example
 *
 * ```typescript
 * const ret = inJapanese('こんにちは中国');
 * console.log(ret); // true
 * ```
 */
export default function inJapanese(str: string) {
    return (_ ?? (_ = new RegExp(japanese))).test(str);
}
