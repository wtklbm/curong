import { isInfinityNegative } from '..';

describe('@curong/types/isInfinityNegative', () => {
    test('测试1', () => {
        expect(isInfinityNegative(1.7976931348623157e103088)).toBe(false);
        expect(isInfinityNegative(-1.7976931348623157e103089)).toBe(true);
        expect(isInfinityNegative(Infinity)).toBe(false);
        expect(isInfinityNegative(-Infinity)).toBe(true);
        expect(isInfinityNegative(5 / 0)).toBe(false);
        expect(isInfinityNegative(-5 / 0)).toBe(true);

        expect(isInfinityNegative(1 * -Infinity)).toBe(true);
        expect(isInfinityNegative(Infinity * -Infinity)).toBe(true);
        expect(isInfinityNegative(-1 * -Infinity)).toBe(false);
        expect(isInfinityNegative(-Infinity * -Infinity)).toBe(false);

        expect(isInfinityNegative(1 / -Infinity)).toBe(false);
        expect(isInfinityNegative(Infinity / -Infinity)).toBe(false);
        expect(isInfinityNegative(Infinity / Infinity)).toBe(false);
        expect(isInfinityNegative(-1 / -Infinity)).toBe(false);
        expect(isInfinityNegative(-Infinity / -Infinity)).toBe(false);

        expect(isInfinityNegative(NaN * -Infinity)).toBe(false);
        expect(isInfinityNegative(-Infinity / -2)).toBe(false);
        expect(isInfinityNegative(-Infinity / 2)).toBe(true);
    });
});
