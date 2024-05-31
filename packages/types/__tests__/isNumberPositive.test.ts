import { isNumberPositive } from '../src';

describe('@curong/types/isNumberPositive', () => {
    test('测试1', () => {
        expect(isNumberPositive(Infinity)).toBe(false);
        expect(isNumberPositive(-Infinity)).toBe(false);

        expect(isNumberPositive(NaN)).toBe(false);
        expect(isNumberPositive(Number.NaN)).toBe(false);

        expect(isNumberPositive(0)).toBe(false);
        expect(isNumberPositive(+0)).toBe(false);
        expect(isNumberPositive(-0)).toBe(false);

        expect(isNumberPositive('-12')).toBe(false);
        expect(isNumberPositive(-12)).toBe(false);
        expect(isNumberPositive([-1])).toBe(false);
        expect(isNumberPositive(-1)).toBe(false);
        expect(isNumberPositive(-1.1)).toBe(false);
        expect(isNumberPositive(-0xff)).toBe(false);
        expect(isNumberPositive(-0o644)).toBe(false);
        expect(isNumberPositive(-6.2e5)).toBe(false);
        expect(isNumberPositive(-Number.MAX_VALUE)).toBe(false);
        expect(isNumberPositive(-Number.MIN_VALUE)).toBe(false);
        expect(isNumberPositive(Number.MAX_VALUE + 1e300)).toBe(false);
        expect(isNumberPositive(Number.MIN_VALUE - 1e300)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberPositive(Number.MAX_VALUE)).toBe(true);
        expect(isNumberPositive(Number.MIN_VALUE)).toBe(true);
        expect(isNumberPositive(0.1)).toBe(true);
        expect(isNumberPositive(1)).toBe(true);
    });
});
