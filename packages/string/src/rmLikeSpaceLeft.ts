import { likeSpaceLeftReg } from './characters';

/**
 * 删除字符串开头像空格的字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const ret = rmLikeSpaceLeft(`\u3000\u3000x\u3000xx\u3000\u3000`);
 * console.log(ret); // 'x\u3000xx\u3000\u3000'
 * ```
 */
export default function rmLikeSpaceLeft(value: string): string {
    return value.replace(likeSpaceLeftReg, '');
}
