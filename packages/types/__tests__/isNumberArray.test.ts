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
});
