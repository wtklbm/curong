import { isNullOrUndefinedArray } from '../src';

describe('@curong/types/isNullOrUndefinedArray', () => {
    test('测试1', () => {
        expect(isNullOrUndefinedArray([])).toBe(false);
        expect(isNullOrUndefinedArray(0)).toBe(false);
        expect(isNullOrUndefinedArray('')).toBe(false);
        expect(isNullOrUndefinedArray(null)).toBe(false);
        expect(isNullOrUndefinedArray([null, 1])).toBe(false);
        expect(isNullOrUndefinedArray([null, ''])).toBe(false);
    });

    test('测试2', () => {
        expect(isNullOrUndefinedArray([null])).toBe(true);
        expect(isNullOrUndefinedArray([null, null])).toBe(true);
        expect(isNullOrUndefinedArray([undefined])).toBe(true);
        expect(isNullOrUndefinedArray([undefined, undefined])).toBe(true);
        expect(isNullOrUndefinedArray([null, undefined])).toBe(true);
    });
});
