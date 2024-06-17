import { isInt32 } from '..';

describe('@curong/types/isInt32', () => {
    test('测试1', () => {
        expect(isInt32(null)).toBe(false);
        expect(isInt32(undefined)).toBe(false);
        expect(isInt32('2147483647')).toBe(false);
        expect(isInt32('')).toBe(false);
        expect(isInt32(true)).toBe(false);
        expect(isInt32(false)).toBe(false);
        expect(isInt32({})).toBe(false);
        expect(isInt32([])).toBe(false);
    });

    test('测试2', () => {
        expect(isInt32(-2147483648)).toBe(true);
        expect(isInt32(0)).toBe(true);
        expect(isInt32(2147483647)).toBe(true);
        expect(isInt32(-2147483649)).toBe(false);
        expect(isInt32(2147483648)).toBe(false);
        expect(isInt32(123.45)).toBe(false);
    });
});
