import { zeroWidthReg } from './characters';

/**
 * 删除字符串中所有的零宽字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmZeroWidth(`\u200B\u200Bx\u200Bxx\u200B\u200B`);
 * console.log(ret); 'xxx'
 * ```
 */
export default function rmZeroWidth(value: string): string {
    return value.replace(zeroWidthReg, '');
}
