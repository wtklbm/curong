import { controlRightReg } from './characters';

/**
 * 删除字符串结尾的控制字符(包含回车、换行、制表符等)
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 */
export default function rmControlRight(value: string): string {
    return value.replace(controlRightReg, '');
}
