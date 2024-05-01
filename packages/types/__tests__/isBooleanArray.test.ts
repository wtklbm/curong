import { isBooleanArray } from '../src';

describe('@curong/types/isBooleanArray', () => {
    test('测试true', () => {
        expect(isBooleanArray(0)).toBe(false);
        expect(isBooleanArray('')).toBe(false);
        expect(isBooleanArray(true)).toBe(false);
        expect(isBooleanArray([true, 1])).toBe(false);
        expect(isBooleanArray([true, ''])).toBe(false);
    });

    test('测试2', () => {
        expect(isBooleanArray([true])).toBe(true);
        expect(isBooleanArray([true, true])).toBe(true);
        expect(isBooleanArray([true, false])).toBe(true);
    });
});
