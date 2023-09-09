import { isArrayDimensional } from '../src';

describe('@curong/types/isArrayDimensional', () => {
    test('测试1', () => {
        expect(isArrayDimensional([])).toBe(false);
        expect(isArrayDimensional([12])).toBe(false);
        expect(isArrayDimensional([12, 34])).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayDimensional([[]])).toBe(true);
        expect(isArrayDimensional([[2]])).toBe(true);
        expect(isArrayDimensional([[2, 3]])).toBe(true);
    });
});
