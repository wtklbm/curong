import { isIntEven } from '..';

describe('@curong/types/isIntEven', () => {
    test('测试1', () => {
        expect(isIntEven([1])).toBe(false);
        expect(isIntEven(12.1)).toBe(false);
        expect(isIntEven(NaN)).toBe(false);
        expect(isIntEven(Number.NaN)).toBe(false);
        expect(isIntEven(Infinity)).toBe(false);
        expect(isIntEven(-Infinity)).toBe(false);
        expect(isIntEven(Number.MAX_VALUE)).toBe(true);
        expect(isIntEven(Number.MIN_VALUE)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntEven(1)).toBe(false);
        expect(isIntEven(-1)).toBe(false);
        expect(isIntEven(2)).toBe(true);
        expect(isIntEven(-2)).toBe(true);
    });
});
