import { isIntOdd } from '../src';

describe('@curong/types/isIntOdd', () => {
    test('测试1', () => {
        expect(isIntOdd([1])).toBe(false);
        expect(isIntOdd(12.1)).toBe(false);
        expect(isIntOdd(NaN)).toBe(false);
        expect(isIntOdd(Number.NaN)).toBe(false);
        expect(isIntOdd(Infinity)).toBe(false);
        expect(isIntOdd(-Infinity)).toBe(false);
        expect(isIntOdd(Number.MAX_VALUE)).toBe(false);
        expect(isIntOdd(Number.MIN_VALUE)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntOdd(1)).toBe(true);
        expect(isIntOdd(-1)).toBe(true);
        expect(isIntOdd(2)).toBe(false);
        expect(isIntOdd(-2)).toBe(false);
    });
});
