/** 宽松。只要以 1 开头即可 */
const lowReg = /^(?:(?:\+|00)86)?1\d{10}$/;

/** 常规。只要以 13、14、15、16、17、18、19 开头即可 */
const mediumReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

/** 更严格的判断 */
const highReg =
    /^(?:(?:\+|00)86)?1(?:(?:3\d)|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8\d)|(?:9[01256789]))\d{8}$/;

/** 验证手机号的正则表达式数组 */
const phoneRegexps = [lowReg, mediumReg, highReg];

/**
 * 是不是一个中国的手机号码
 *
 * @param value 手机号码
 * @param strictLevel 严格程度
 * - `0`: 只要以 1 开头即可
 * - `1`: 只要以 13、14、15、16、17、18、19 开头即可
 * - `2`: 更严格的判断
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isChinaPhoneNumber(
    value: number | string,
    strictLevel: 0 | 1 | 2 = 1
): boolean {
    return phoneRegexps[strictLevel].test(`${value}`);
}
