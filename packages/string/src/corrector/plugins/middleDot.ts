/** 验证中间点、加重号、连字点的正则表达式 */
const middleDotBulletHyphenationPoint = / *[\u00b7\u2022\u2027] */g;

/**
 * 将 中间点、加重号、连字点 替换为 中间点。
 *
 * @param value 要转换的字符串
 * @returns 返回转换好的字符串
 */
export function convertMiddleDot(value: string): string {
    return value.replace(middleDotBulletHyphenationPoint, '・');
}
