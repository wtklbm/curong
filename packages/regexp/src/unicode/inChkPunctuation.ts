import { chkPunctuation } from './source';

let _: RegExp;

/**
 * 是否包含中日韩标点符号
 *
 * @param str 要验证的字符串
 * @returns 返回验证的结果
 * @example
 *
 * ```typescript
 * const ret = inChkPunctuation('您好，中国');
 * console.log(ret); // true
 * ```
 */
export default function inChkPunctuation(str: string): boolean {
    return (_ ?? (_ = new RegExp(chkPunctuation))).test(str);
}
