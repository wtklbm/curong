import { isNonNaNNumber } from '../src';

describe('@curong/types/isNonNaNNumber', () => {
    test('测试1', () => {
        expect(isNonNaNNumber('12')).toBe(false);
        expect(isNonNaNNumber(NaN)).toBe(false);
        expect(isNonNaNNumber(Number.NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isNonNaNNumber(12)).toBe(true);
        expect(isNonNaNNumber([1])).toBe(false);
        expect(isNonNaNNumber(0)).toBe(true);
        expect(isNonNaNNumber(1)).toBe(true);
        expect(isNonNaNNumber(1.1)).toBe(true);
        expect(isNonNaNNumber(0xff)).toBe(true);
        expect(isNonNaNNumber(0o644)).toBe(true);
        expect(isNonNaNNumber(6.2e5)).toBe(true);
        expect(isNonNaNNumber(Infinity)).toBe(true);
        expect(isNonNaNNumber(-Infinity)).toBe(true);
    });
});
