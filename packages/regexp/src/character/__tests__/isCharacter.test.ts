import { isCharacter } from '..';

describe('@curong/types/isCharacter', () => {
    test('测试1: 输入为只包含字母的字符串，返回 true', () => {
        expect(isCharacter('abc')).toBe(true);
        expect(isCharacter('ABC')).toBe(true);
        expect(isCharacter('aBc')).toBe(true);
    });

    test('测试2: 输入为包含数字的字符串，返回 false', () => {
        expect(isCharacter('abc123')).toBe(false);
        expect(isCharacter('123')).toBe(false);
    });

    test('测试3: 输入为包含特殊字符的字符串，返回 false', () => {
        expect(isCharacter('abc@')).toBe(false);
        expect(isCharacter('!@#$')).toBe(false);
    });

    test('测试4: 输入为空字符串，返回 false', () => {
        expect(isCharacter('')).toBe(false);
    });

    test('测试5: 输入为包含空格的字符串，返回 false', () => {
        expect(isCharacter('abc def')).toBe(false);
    });

    test('测试6: 输入为包含中文字符的字符串，返回 false', () => {
        expect(isCharacter('abc中文')).toBe(false);
    });
});
