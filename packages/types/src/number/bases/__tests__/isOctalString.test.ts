import { isOctalString } from '..';

describe('@curong/types/isOctalString', () => {
    test('测试1: 输入为有效的八进制字符串，且以 "0o" 开头', () => {
        expect(isOctalString('0o1234567')).toBe(true);
    });

    test('测试2: 输入为有效的八进制字符串，包含数字 0-7', () => {
        expect(isOctalString('0o702134')).toBe(true);
    });

    test('测试3: 输入为有效的八进制字符串，包含小写字母 "o" 前缀', () => {
        expect(isOctalString('0o123')).toBe(true);
    });

    test('测试4: 输入为无效的八进制字符串，包含非八进制字符', () => {
        expect(isOctalString('0o1238')).toBe(false);
    });

    test('测试5: 输入为无效的字符串，不以 "0o" 开头', () => {
        expect(isOctalString('1234567')).toBe(false);
    });

    test('测试6: 输入为非字符串类型，如数字', () => {
        expect(isOctalString(1234567)).toBe(false);
    });

    test('测试7: 输入为非字符串类型，如对象', () => {
        expect(isOctalString({})).toBe(false);
    });

    test('测试8: 输入为空字符串', () => {
        expect(isOctalString('')).toBe(false);
    });

    test('测试9: 输入为null', () => {
        expect(isOctalString(null)).toBe(false);
    });

    test('测试10: 输入为undefined', () => {
        expect(isOctalString(undefined)).toBe(false);
    });

    test('测试11: 输入为含有 "0o" 的无效字符串', () => {
        expect(isOctalString('0o89abc')).toBe(false);
    });

    test('测试12: 输入为包含空格的无效八进制字符串', () => {
        expect(isOctalString('0o123 456')).toBe(false);
    });
});
