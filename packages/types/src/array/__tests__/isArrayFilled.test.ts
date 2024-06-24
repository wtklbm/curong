import { isArrayFilled } from '..';

describe('@curong/types/isArrayFilled', () => {
    test('测试1', () => {
        expect(isArrayFilled(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayFilled([])).toBe(false);
    });

    test('测试3', () => {
        expect(isArrayFilled([1])).toBe(true);
    });
});
