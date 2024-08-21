import { likeSpaceEndReg } from '../character/characters';

/**
 * 删除字符串结尾像空格的字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmLikeSpaceEnd(`\u3000\u3000x\u3000xx\u3000\u3000`);
 * console.log(ret); // '\u3000\u3000x\u3000xx'
 * ```
 */
export default function rmLikeSpaceEnd(value: string): string {
    return value.replace(likeSpaceEndReg, '');
}
