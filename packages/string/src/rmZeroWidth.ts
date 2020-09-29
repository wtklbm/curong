import { zeroWidthReg } from './characters';

/**
 * 删除字符串中所有的零宽字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 */
export default function rmZeroWidth(value: string): string {
    return value.replace(zeroWidthReg, '');
}
