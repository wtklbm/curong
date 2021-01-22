import { chkPunctuation } from './source';

/**
 * 是否包含中日韩标点符号
 *
 * @param str 要验证的字符串
 * @returns 返回验证的结果
 */
export default function inChkPunctuation(str: string): boolean {
    return new RegExp(chkPunctuation).test(str);
}
