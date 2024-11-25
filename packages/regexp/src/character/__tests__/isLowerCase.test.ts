import { isLowerCase } from '..';

describe('@curong/types/isLowerCase', () => {
    test('测试1: 输入为只包含小写字母的字符串，返回 true', () => {
        expect(isLowerCase('abc')).toBe(true);
        expect(isLowerCase('xyz')).toBe(true);
    });

    test('测试2: 输入为包含大写字母的字符串，返回 false', () => {
        expect(isLowerCase('aBc')).toBe(false);
        expect(isLowerCase('ABC')).toBe(false);
    });

    test('测试3: 输入为包含数字的字符串，返回 false', () => {
        expect(isLowerCase('abc123')).toBe(false);
        expect(isLowerCase('123')).toBe(false);
    });

    test('测试4: 输入为包含特殊字符的字符串，返回 false', () => {
        expect(isLowerCase('abc@')).toBe(false);
        expect(isLowerCase('!@#$')).toBe(false);
    });

    test('测试5: 输入为空字符串，返回 false', () => {
        expect(isLowerCase('')).toBe(false);
    });

    test('测试6: 输入为包含空格的字符串，返回 false', () => {
        expect(isLowerCase('abc def')).toBe(false);
    });

    test('测试7: 输入为中文字符的字符串，返回 false', () => {
        expect(isLowerCase('abc中文')).toBe(false);
    });
});
