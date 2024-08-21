import { zeroWidthStartReg } from '../character/characters';

/**
 * 删除字符串开头的零宽字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmZeroWidthStart(`\u200B\u200Bx\u200Bxx\u200B\u200B`);
 * console.log(ret); // 'x\u200Bxx\u200B\u200B'
 * ```
 */
export default function rmZeroWidthStart(value: string): string {
    return value.replace(zeroWidthStartReg, '');
}
