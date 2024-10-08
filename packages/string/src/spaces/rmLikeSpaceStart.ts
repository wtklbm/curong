import { likeSpaceStartReg } from '../character/characters';

/**
 * 删除字符串开头像空格的字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```typescript
 * const ret = rmLikeSpaceStart(`\u3000\u3000x\u3000xx\u3000\u3000`);
 * console.log(ret); // 'x\u3000xx\u3000\u3000'
 * ```
 */
export default function rmLikeSpaceStart(value: string): string {
    return value.replace(likeSpaceStartReg, '');
}
