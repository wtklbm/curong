import { isNumberArray } from '../src';

describe('@curong/types/isNumberArray', () => {
    test('测试1', () => {
        expect(isNumberArray([])).toBe(false);
        expect(isNumberArray(0)).toBe(false);
        expect(isNumberArray('')).toBe(false);
        expect(isNumberArray(2)).toBe(false);
        expect(isNumberArray([2, '1'])).toBe(false);
        expect(isNumberArray([2, true])).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberArray([2])).toBe(true);
        expect(isNumberArray([2, 2])).toBe(true);
    });

    test('测试3', () => {
        expect(isNumberArray([NaN])).toBe(false);
        expect(isNumberArray([NaN], true)).toBe(true);
        expect(isNumberArray([NaN], false)).toBe(false);
        expect(isNumberArray([Number.NaN])).toBe(false);
        expect(isNumberArray([Number.NaN], true)).toBe(true);
        expect(isNumberArray([Number.NaN], false)).toBe(false);
    });
});
