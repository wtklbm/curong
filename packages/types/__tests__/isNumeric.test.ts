import { isNumeric } from '../src';

describe('@curong/types/isNumeric', () => {
    test('测试1', () => {
        expect(isNumeric('')).toBe(false);
        expect(isNumeric('11 23')).toBe(false);
        expect(isNumeric('MIN_VALUE')).toBe(false);
        expect(isNumeric('Number.MIN_VALUE')).toBe(false);
        expect(isNumeric('POSITIVE_INFINITY')).toBe(false);
        expect(isNumeric('xxx')).toBe(false);
        expect(isNumeric(NaN)).toBe(false);
        expect(isNumeric(Number.NaN)).toBe(false);
        expect(isNumeric(true)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumeric('Infinity')).toBe(true);
        expect(isNumeric('-Infinity')).toBe(true);
        expect(isNumeric(`${Number.POSITIVE_INFINITY}`)).toBe(true);
        expect(isNumeric(1)).toBe(true);
        expect(isNumeric(Number(1))).toBe(true);
        expect(isNumeric(new Number(1))).toBe(true);
        expect(isNumeric(Object(1))).toBe(true);
        expect(isNumeric(Number(1) + '')).toBe(true);
        expect(isNumeric(new Number(1) + '')).toBe(true);
        expect(isNumeric(Object(1) + '')).toBe(true);
        expect(isNumeric(0)).toBe(true);
        expect(isNumeric(11.23)).toBe(true);
        expect(isNumeric('1')).toBe(true);
        expect(isNumeric('0')).toBe(true);
        expect(isNumeric('11.23')).toBe(true);
    });
});
