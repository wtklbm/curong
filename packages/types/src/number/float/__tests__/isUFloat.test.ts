import { isUFloat } from '..';

describe('@curong/types/isUFloat', () => {
    test('测试1', () => {
        expect(isUFloat(12.0)).toBe(false);
        expect(isUFloat(-12.0)).toBe(false);
        expect(isUFloat(-1)).toBe(false);
        expect(isUFloat(Math.pow(2, 52) + 0.1)).toBe(false);
        expect(isUFloat(Math.pow(2, 52) - 0.25)).toBe(false);
    });

    test('测试2', () => {
        expect(isUFloat(0.0001)).toBe(true);
        expect(isUFloat(15.2)).toBe(true);
        expect(isUFloat(Math.pow(2, 52) - 0.251)).toBe(true);
        expect(isUFloat(0.1)).toBe(true);
        expect(isUFloat(1.23)).toBe(true);
        expect(isUFloat(1000.123)).toBe(true);
        expect(isUFloat(-0.1)).toBe(false);
        expect(isUFloat(0)).toBe(false);
        expect(isUFloat(-123.45)).toBe(false);
    });

    test('测试3', () => {
        expect(isUFloat(null)).toBe(false);
        expect(isUFloat(undefined)).toBe(false);
        expect(isUFloat('123.45')).toBe(false);
        expect(isUFloat('')).toBe(false);
        expect(isUFloat(true)).toBe(false);
        expect(isUFloat(false)).toBe(false);
        expect(isUFloat({})).toBe(false);
        expect(isUFloat([])).toBe(false);
    });
});
