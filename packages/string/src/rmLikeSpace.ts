import { likeSpaceReg } from './characters';
import rmLikeSpaceEnd from './rmLikeSpaceEnd';
import rmLikeSpaceStart from './rmLikeSpaceStart';

/**
 * 将字符串中开头和结尾的像空格的字符删除，并将其余所有的像空格的字符替换为空格
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmLikeSpace(`\u00A0\u00A0x\u00A0xx\u00A0\u00A0`);
 * console.log(ret); // 'x xx'
 * ```
 */
export default function rmLikeSpace(value: string): string {
    return rmLikeSpaceStart(rmLikeSpaceEnd(value)).replace(likeSpaceReg, ' ');
}
