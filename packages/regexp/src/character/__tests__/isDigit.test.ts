import { isDigit } from '..';

describe('@curong/types/isDigit', () => {
    test('测试1: 输入为只包含数字的字符串，返回 true', () => {
        expect(isDigit('123')).toBe(true);
        expect(isDigit('456789')).toBe(true);
    });

    test('测试2: 输入为包含非数字字符的字符串，返回 false', () => {
        expect(isDigit('123abc')).toBe(false);
        expect(isDigit('abc')).toBe(false);
        expect(isDigit('12.34')).toBe(false);
    });

    test('测试3: 输入为数字，返回 true', () => {
        expect(isDigit(123)).toBe(true);
        expect(isDigit(456789)).toBe(true);
    });

    test('测试4: 输入为包含小数点的数字，返回 false', () => {
        expect(isDigit(123.45)).toBe(false);
    });

    test('测试5: 输入为负数，返回 false', () => {
        expect(isDigit(-123)).toBe(false);
    });

    test('测试6: 输入为空字符串，返回 false', () => {
        expect(isDigit('')).toBe(false);
    });

    test('测试7: 输入为 null 或 undefined，返回 false', () => {
        expect(isDigit(null as any)).toBe(false);
        expect(isDigit(undefined as any)).toBe(false);
    });

    test('测试8: 输入为数字字符串的数字形式，返回 true', () => {
        expect(isDigit('0')).toBe(true);
        expect(isDigit('1000')).toBe(true);
    });

    test('测试9: 输入为包含空格的字符串，返回 false', () => {
        expect(isDigit(' 123 ')).toBe(false);
    });
});
