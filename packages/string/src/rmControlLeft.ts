import { controlLeftReg } from './characters';

/**
 * 删除字符串开头的控制字符(包含回车、换行、制表符等)
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const ret = rmControlLeft(`\b\r\nxx\vx\t\n`);
 * console.log(ret); // 'xx\vx\t\n'
 * ```
 */
export default function rmControlLeft(value: string): string {
    return value.replace(controlLeftReg, '');
}
