import { isInfinityPositive } from '../src';

describe('@curong/types/isInfinityPositive', () => {
    test('测试1', () => {
        expect(isInfinityPositive(1.7976931348623157e103088)).toBe(true);
        expect(isInfinityPositive(-1.7976931348623157e103089)).toBe(false);
        expect(isInfinityPositive(Infinity)).toBe(true);
        expect(isInfinityPositive(-Infinity)).toBe(false);
        expect(isInfinityPositive(5 / 0)).toBe(true);
        expect(isInfinityPositive(-5 / 0)).toBe(false);

        expect(isInfinityPositive(2 * Infinity)).toBe(true);
        expect(isInfinityPositive(Infinity * Infinity)).toBe(true);
        expect(isInfinityPositive(-2 * Infinity)).toBe(false);
        expect(isInfinityPositive(-Infinity * Infinity)).toBe(false);

        expect(isInfinityPositive(2 / Infinity)).toBe(false);
        expect(isInfinityPositive(Infinity / Infinity)).toBe(false);
        expect(isInfinityPositive(Infinity / -Infinity)).toBe(false);
        expect(isInfinityPositive(-2 / Infinity)).toBe(false);
        expect(isInfinityPositive(-Infinity / Infinity)).toBe(false);

        expect(isInfinityPositive(0 * Infinity)).toBe(false);
        expect(isInfinityPositive(NaN * Infinity)).toBe(false);

        expect(isInfinityPositive(Infinity / 1)).toBe(true);
        expect(isInfinityPositive(Infinity / -1)).toBe(false);
    });
});
