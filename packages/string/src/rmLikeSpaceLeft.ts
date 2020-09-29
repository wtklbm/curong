import { likeSpaceLeftReg } from './characters';

/**
 * 删除字符串开头像空格的字符
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 */
export default function rmLikeSpaceLeft(value: string): string {
    return value.replace(likeSpaceLeftReg, '');
}
