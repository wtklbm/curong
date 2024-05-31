import { isNumberSafe } from '../src';

describe('@curong/types/isNumberSafe', () => {
    test('测试1', () => {
        expect(isNumberSafe(Infinity)).toBe(false);
        expect(isNumberSafe(-Infinity)).toBe(false);
        expect(isNumberSafe(Number.POSITIVE_INFINITY)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberSafe(1.0)).toBe(true);
        expect(isNumberSafe(1.5e3)).toBe(true);
        expect(isNumberSafe(-1.5e3)).toBe(true);
        expect(isNumberSafe(Number.MAX_VALUE)).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberSafe(NaN)).toBe(false);
        expect(isNumberSafe(Number.NaN)).toBe(false);
    });
});
