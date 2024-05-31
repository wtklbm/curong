import { isNumberSafe } from '../src';

describe('@curong/types/isNumberSafe', () => {
    test('测试1', () => {
        expect(isNumberSafe(Infinity)).toBe(false);
        expect(isNumberSafe(-Infinity)).toBe(false);
        expect(isNumberSafe(Number.POSITIVE_INFINITY)).toBe(false); // Infinity
        expect(isNumberSafe(Number.NEGATIVE_INFINITY)).toBe(false); // -Infinity
        expect(isNumberSafe(NaN)).toBe(false);
        expect(isNumberSafe(Number.NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberSafe(1.0)).toBe(true);
        expect(isNumberSafe(1.5e3)).toBe(true);
        expect(isNumberSafe(-1.5e3)).toBe(true);
        expect(isNumberSafe(Number.MAX_VALUE)).toBe(true);
        expect(isNumberSafe(Number.MIN_VALUE)).toBe(true);
        expect(isNumberSafe(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(isNumberSafe(Number.MIN_SAFE_INTEGER)).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberSafe(Number.MAX_VALUE)).toBe(true); // 1.7976931348623157e+308
        expect(isNumberSafe(Number.MAX_VALUE + 1e300)).toBe(false); // Infinity
        expect(isNumberSafe(Number.MAX_VALUE - 1e300)).toBe(true); // 1.7976931248623157e+308
        expect(isNumberSafe(-Number.MAX_VALUE)).toBe(true); // -1.7976931348623157e+308
        expect(isNumberSafe(-Number.MAX_VALUE - 1e300)).toBe(false); // -Infinity
        expect(isNumberSafe(-Number.MAX_VALUE + 1e300)).toBe(true); // -1.7976931248623157e+308

        expect(isNumberSafe(Number.MIN_VALUE)).toBe(true); // 5e-324
        expect(isNumberSafe(Number.MIN_VALUE + 1e300)).toBe(true); // 1e+300
        expect(isNumberSafe(Number.MIN_VALUE - 1e300)).toBe(true); // -1e+300
        expect(isNumberSafe(-Number.MIN_VALUE)).toBe(true); // -5e-324
        expect(isNumberSafe(-Number.MIN_VALUE - 1e300)).toBe(true); // -1e+300
        expect(isNumberSafe(-Number.MIN_VALUE + 1e300)).toBe(true); // -1e+300
    });
});
