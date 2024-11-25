import { isUpperCase } from '..';

describe('@curong/types/isUpperCase', () => {
    test('测试1: 输入为只包含大写字母的字符串，返回 true', () => {
        expect(isUpperCase('ABC')).toBe(true);
        expect(isUpperCase('XYZ')).toBe(true);
    });

    test('测试2: 输入为包含小写字母的字符串，返回 false', () => {
        expect(isUpperCase('aBC')).toBe(false);
        expect(isUpperCase('Abc')).toBe(false);
    });

    test('测试3: 输入为包含数字的字符串，返回 false', () => {
        expect(isUpperCase('ABC123')).toBe(false);
        expect(isUpperCase('123')).toBe(false);
    });

    test('测试4: 输入为包含特殊字符的字符串，返回 false', () => {
        expect(isUpperCase('ABC@')).toBe(false);
        expect(isUpperCase('!@#$')).toBe(false);
    });

    test('测试5: 输入为空字符串，返回 false', () => {
        expect(isUpperCase('')).toBe(false);
    });

    test('测试6: 输入为包含空格的字符串，返回 false', () => {
        expect(isUpperCase('ABC DEF')).toBe(false);
    });

    test('测试7: 输入为中文字符的字符串，返回 false', () => {
        expect(isUpperCase('ABC中文')).toBe(false);
    });
});
