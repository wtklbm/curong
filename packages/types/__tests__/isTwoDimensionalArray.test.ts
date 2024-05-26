import { isTwoDimensionalArray } from '../src';

describe('@curong/types/isTwoDimensionalArray', () => {
    it('测试1', () => {
        expect(isTwoDimensionalArray(123)).toBe(false);
        expect(isTwoDimensionalArray([1, [2, 3], 'not an array'])).toBe(false);
        expect(isTwoDimensionalArray([])).toBe(false);
        expect(isTwoDimensionalArray([[1, 2], 3])).toBe(false);
    });

    it('测试2', () => {
        expect(isTwoDimensionalArray([[]])).toBe(true);
        expect(isTwoDimensionalArray([[[]]])).toBe(true);
        expect(isTwoDimensionalArray([[[[]]]])).toBe(true);

        expect(
            isTwoDimensionalArray([
                [1, 2],
                [3, 4]
            ])
        ).toBe(true);
    });
});
