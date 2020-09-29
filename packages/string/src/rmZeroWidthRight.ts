import { zeroWidthRightReg } from './characters';

/**
 * 删除字符串结尾的零宽字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 */
export default function rmZeroWidthRight(value: string): string {
    return value.replace(zeroWidthRightReg, '');
}
