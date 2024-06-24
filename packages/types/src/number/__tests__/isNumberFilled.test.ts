import { isNumberFilled } from '..';

describe('@curong/types/isNumberFilled', () => {
    test('测试1', () => {
        expect(isNumberFilled(Infinity)).toBe(false);
        expect(isNumberFilled(-Infinity)).toBe(false);
        expect(isNumberFilled(NaN)).toBe(false);
        expect(isNumberFilled(Number.NaN)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberFilled(0)).toBe(false);
        // @ts-ignore
        expect(isNumberFilled(0n)).toBe(false);
        // @ts-ignore
        expect(isNumberFilled(-1n)).toBe(false);
    });

    test('测试3', () => {
        expect(isNumberFilled(-1)).toBe(true);
        expect(isNumberFilled(1.0)).toBe(true);
        expect(isNumberFilled(1.5e3)).toBe(true);
        expect(isNumberFilled(Number.MAX_VALUE)).toBe(true);
        expect(isNumberFilled(Number.MIN_VALUE)).toBe(true);
    });
});
