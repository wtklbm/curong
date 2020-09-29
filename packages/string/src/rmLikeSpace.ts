import { likeSpaceReg } from './characters';
import rmLikeSpaceLeft from './rmLikeSpaceLeft';
import rmLikeSpaceRight from './rmLikeSpaceRight';

/**
 * 将字符串中开头和结尾的像空格的字符删除，并将其余所有的像空格的字符替换为空格
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 */
export default function rmLikeSpace(value: string): string {
    return rmLikeSpaceLeft(rmLikeSpaceRight(value)).replace(likeSpaceReg, ' ');
}
