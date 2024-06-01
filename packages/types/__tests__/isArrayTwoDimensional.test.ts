import { isArrayTwoDimensional } from '../src';

describe('@curong/types/isArrayTwoDimensional', () => {
    it('测试1', () => {
        expect(isArrayTwoDimensional(123)).toBe(false);
        expect(isArrayTwoDimensional([1, [2, 3], 'not an array'])).toBe(false);
        expect(isArrayTwoDimensional([])).toBe(false);
        expect(isArrayTwoDimensional([[1, 2], 3])).toBe(false);
    });

    it('测试2', () => {
        expect(isArrayTwoDimensional([[]])).toBe(true);
        expect(isArrayTwoDimensional([[[]]])).toBe(true);
        expect(isArrayTwoDimensional([[[[]]]])).toBe(true);

        expect(
            isArrayTwoDimensional([
                [1, 2],
                [3, 4]
            ])
        ).toBe(true);
    });
});
