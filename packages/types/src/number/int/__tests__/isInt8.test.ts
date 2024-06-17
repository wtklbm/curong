import { isInt8 } from '..';

describe('@curong/types/isInt8', () => {
    test('测试1', () => {
        expect(isInt8(null)).toBe(false);
        expect(isInt8(undefined)).toBe(false);
        expect(isInt8('127')).toBe(false);
        expect(isInt8('')).toBe(false);
        expect(isInt8(true)).toBe(false);
        expect(isInt8(false)).toBe(false);
        expect(isInt8({})).toBe(false);
        expect(isInt8([])).toBe(false);
    });

    test('测试2', () => {
        expect(isInt8(-128)).toBe(true);
        expect(isInt8(0)).toBe(true);
        expect(isInt8(127)).toBe(true);
        expect(isInt8(-129)).toBe(false);
        expect(isInt8(128)).toBe(false);
        expect(isInt8(123.45)).toBe(false);
    });
});
