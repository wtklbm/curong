import { isNullArray } from '..';

describe('@curong/types/isNullArray', () => {
    test('测试1', () => {
        expect(isNullArray([])).toBe(false);
        expect(isNullArray(0)).toBe(false);
        expect(isNullArray('')).toBe(false);
        expect(isNullArray(null)).toBe(false);
        expect(isNullArray([null, 1])).toBe(false);
        expect(isNullArray([null, ''])).toBe(false);
    });

    test('测试2', () => {
        expect(isNullArray([null])).toBe(true);
        expect(isNullArray([null, null])).toBe(true);
    });
});
