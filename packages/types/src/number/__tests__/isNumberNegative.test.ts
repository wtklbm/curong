import { isNumberNegative } from '..';

describe('@curong/types/isNumberNegative', () => {
    test('测试1', () => {
        expect(isNumberNegative(Infinity)).toBe(false);
        expect(isNumberNegative(-Infinity)).toBe(false);

        expect(isNumberNegative(NaN)).toBe(false);
        expect(isNumberNegative(Number.NaN)).toBe(false);

        expect(isNumberNegative(0)).toBe(false);
        expect(isNumberNegative(+0)).toBe(false);
        expect(isNumberNegative(-0)).toBe(false);

        expect(isNumberNegative('12')).toBe(false);
        expect(isNumberNegative(12)).toBe(false);
        expect(isNumberNegative([1])).toBe(false);
        expect(isNumberNegative(0)).toBe(false);
        expect(isNumberNegative(1)).toBe(false);
        expect(isNumberNegative(1.1)).toBe(false);
        expect(isNumberNegative(0xff)).toBe(false);
        expect(isNumberNegative(0o644)).toBe(false);
        expect(isNumberNegative(6.2e5)).toBe(false);
        expect(isNumberNegative(Number.MIN_VALUE)).toBe(false);
        expect(isNumberNegative(Number.MAX_VALUE)).toBe(false);
        expect(isNumberNegative(-Number.MIN_VALUE + 1e300)).toBe(false);
        expect(isNumberNegative(-Number.MAX_VALUE - 1e300)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberNegative(-Number.MAX_VALUE)).toBe(true);
        expect(isNumberNegative(-Number.MIN_VALUE)).toBe(true);
        expect(isNumberNegative(-0.1)).toBe(true);
        expect(isNumberNegative(-1)).toBe(true);
    });
});
