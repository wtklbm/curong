import { isASCII } from '..';

describe('@curong/types/isASCII', () => {
    test('测试1: 输入为只包含 ASCII 字符的字符串，返回 true', () => {
        expect(isASCII('hello')).toBe(true);
        expect(isASCII('123')).toBe(true);
        expect(isASCII('ABC')).toBe(true);
    });

    test('测试2: 输入为包含非 ASCII 字符的字符串，返回 false', () => {
        expect(isASCII('你好')).toBe(false);
        expect(isASCII('abc中文')).toBe(false);
        expect(isASCII('hello©')).toBe(false);
    });

    test('测试3: 输入为包含 ASCII 和非 ASCII 字符的混合字符串，返回 false', () => {
        expect(isASCII('hello你好')).toBe(false);
        expect(isASCII('abc©def')).toBe(false);
    });

    test('测试4: 输入为空字符串，返回 true', () => {
        expect(isASCII('')).toBe(true);
    });

    test('测试5: 输入为只有一个字符的字符串，且该字符为 ASCII 字符，返回 true', () => {
        expect(isASCII('a')).toBe(true);
        expect(isASCII('1')).toBe(true);
    });

    test('测试6: 输入为只有一个字符的字符串，且该字符为非 ASCII 字符，返回 false', () => {
        expect(isASCII('中')).toBe(false);
        expect(isASCII('©')).toBe(false);
    });

    test('测试7: 输入为包含特殊符号的字符串，且符号为 ASCII 字符，返回 true', () => {
        expect(isASCII('!@#$%^&*()')).toBe(true);
    });

    test('测试8: 输入为包含特殊符号的字符串，且符号为非 ASCII 字符，返回 false', () => {
        expect(isASCII('©®')).toBe(false);
    });
});
