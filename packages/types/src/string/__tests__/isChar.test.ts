import { isChar } from '..';

describe('@curong/types/isChar', () => {
    test('测试1', () => {
        expect(isChar(12)).toBe(false);
        expect(isChar('')).toBe(false);
        expect(isChar(String(''))).toBe(false);
        expect(isChar(new String())).toBe(false);
        expect(isChar(Object(''))).toBe(false);
        expect(isChar(new Object(''))).toBe(false);
        expect(isChar(null)).toBe(false);
    });

    test('测试2', () => {
        expect(isChar('a')).toBe(true);
        expect(isChar('Z')).toBe(true);
        expect(isChar('1')).toBe(true);
        expect(isChar('!')).toBe(true);
    });

    test('测试3', () => {
        expect(isChar('ab')).toBe(false);
        expect(isChar('123')).toBe(false);
        expect(isChar('!@')).toBe(false);
    });
});
