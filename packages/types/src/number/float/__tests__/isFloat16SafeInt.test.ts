import { isFloat16SafeInt } from '..';

describe('@curong/types/isFloat16SafeInt', () => {
    test('测试1', () => {
        expect(isFloat16SafeInt(null)).toBe(false);
        expect(isFloat16SafeInt(undefined)).toBe(false);
        expect(isFloat16SafeInt('2047')).toBe(false);
        expect(isFloat16SafeInt('')).toBe(false);
        expect(isFloat16SafeInt(true)).toBe(false);
        expect(isFloat16SafeInt(false)).toBe(false);
        expect(isFloat16SafeInt({})).toBe(false);
        expect(isFloat16SafeInt([])).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat16SafeInt(-2047)).toBe(true);
        expect(isFloat16SafeInt(0)).toBe(true);
        expect(isFloat16SafeInt(2047)).toBe(true);
        expect(isFloat16SafeInt(-2048)).toBe(false);
        expect(isFloat16SafeInt(2048)).toBe(false);
        expect(isFloat16SafeInt(123.45)).toBe(false);
    });
});
