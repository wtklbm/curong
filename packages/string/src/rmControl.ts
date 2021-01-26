import { controlReg } from './characters';

/**
 * 删除字符串中所有的控制字符(包含回车、换行、制表符等)
 *
 * @param value 要删除字符的字符串
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const ret = rmControl(`\b\r\nxx\vx\t\n`);
 * console.log(ret); // 'xxx'
 * ```
 */
export default function rmControl(value: string): string {
    return value.replace(controlReg, '');
}
