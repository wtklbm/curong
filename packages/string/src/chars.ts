/**
 * 将字符串转换为字符数组
 *
 * 如果希望将字符数组转换为字符串，请使用 `fromChars` 方法。
 *
 * @param value 要转换的字符串
 * @returns 返回转换好的字符数组
 * @example
 *
 * ```javascript
 * const ret = chars('中国');
 * console.log(ret); // [ '中', '国' ]
 * ```
 */
export default function chars(value: string): string[] {
    return value.split('');
}
