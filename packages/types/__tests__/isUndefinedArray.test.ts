import { isUndefinedArray } from '../src';

describe('@curong/types/isUndefinedArray', () => {
    test('测试1', () => {
        expect(isUndefinedArray([])).toBe(false);
        expect(isUndefinedArray(0)).toBe(false);
        expect(isUndefinedArray('')).toBe(false);
        expect(isUndefinedArray(void 0)).toBe(false);
        expect(isUndefinedArray([undefined, 1])).toBe(false);
        expect(isUndefinedArray([null, undefined, ''])).toBe(false);
    });

    test('测试2', () => {
        expect(isUndefinedArray([void 0])).toBe(true);
        expect(isUndefinedArray([undefined, undefined])).toBe(true);
    });
});
