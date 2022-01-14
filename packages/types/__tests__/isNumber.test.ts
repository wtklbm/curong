import { isNumber } from '../src';

describe('@curong/types/isNumber', () => {
    test('测试1', () => {
        expect(isNumber('12')).toBe(false);
    });

    test('测试2', () => {
        expect(isNumber(12)).toBe(true);
        expect(isNumber([1])).toBe(false);
        expect(isNumber(0)).toBe(true);
        expect(isNumber(1)).toBe(true);
        expect(isNumber(1.1)).toBe(true);
        expect(isNumber(0xff)).toBe(true);
        expect(isNumber(0o644)).toBe(true);
        expect(isNumber(6.2e5)).toBe(true);
        expect(isNumber(NaN)).toBe(true);
        expect(isNumber(Infinity)).toBe(true);
    });
});
