import { zeroWidthEndReg } from '../character/characters';

/**
 * 删除字符串结尾的零宽字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmZeroWidthEnd(`\u200B\u200Bx\u200Bxx\u200B\u200B`);
 * console.log(ret); // '\u200B\u200Bx\u200Bxx'
 * ```
 */
export default function rmZeroWidthEnd(value: string): string {
    return value.replace(zeroWidthEndReg, '');
}
