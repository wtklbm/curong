/**
 * 将字符数组转换为字符串
 *
 * 如果希望将字符串转换为字符数组，请使用 `chars` 方法。
 *
 * @param value 要转换的字符数组
 * @returns 返回转换好的字符串
 */
export default function fromBytes(value: string[]): string {
    return value.join('');
}
