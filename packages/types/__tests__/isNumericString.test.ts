import { isNumericString } from '../src';

describe('@curong/types/isNumericString', () => {
    test('测试1', () => {
        expect(isNumericString('')).toBe(false);
        expect(isNumericString('11 23')).toBe(false);
        expect(isNumericString('MIN_VALUE')).toBe(false);
        expect(isNumericString('Number.MIN_VALUE')).toBe(false);
        expect(isNumericString('POSITIVE_INFINITY')).toBe(false);
        expect(isNumericString('xxx')).toBe(false);
        expect(isNumericString(NaN)).toBe(false);
        expect(isNumericString('NaN')).toBe(false);
        expect(isNumericString(Number.NaN)).toBe(false);
        expect(isNumericString(Number.NaN + '')).toBe(false);
        expect(isNumericString(true)).toBe(false);
        expect(isNumericString(true + '')).toBe(false);
        expect(isNumericString(1)).toBe(false);
        expect(isNumericString(Number(1))).toBe(false);
        expect(isNumericString(new Number(1))).toBe(false);
        expect(isNumericString(Object(1))).toBe(false);
        expect(isNumericString(0)).toBe(false);
        expect(isNumericString(11.23)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumericString('Infinity')).toBe(true);
        expect(isNumericString('-Infinity')).toBe(true);
        expect(isNumericString(`${Number.POSITIVE_INFINITY}`)).toBe(true);
        expect(isNumericString('1')).toBe(true);
        expect(isNumericString(`${Number(1)}`)).toBe(true);
        expect(isNumericString(new Number(1) + '')).toBe(true);
        expect(isNumericString(Object(1) + '')).toBe(true);
        expect(isNumericString(Number(1) + '')).toBe(true);
        expect(isNumericString(new Number(1) + '')).toBe(true);
        expect(isNumericString(Object(1) + '')).toBe(true);
        expect(isNumericString(0 + '')).toBe(true);
        expect(isNumericString(11.23 + '')).toBe(true);
        expect(isNumericString('0')).toBe(true);
        expect(isNumericString('11.23')).toBe(true);
    });
});
