import { isUnique } from '../src';

describe('@curong/array/isUnique', () => {
    test('输入数组中所有元素都是唯一的', () => {
        expect(isUnique([1, 2, 3, 4])).toBe(true);
        expect(isUnique(['a', 'b', 'c'])).toBe(true);
        expect(isUnique([NaN, 1, 2])).toBe(true);
    });

    test('输入数组中有重复元素', () => {
        expect(isUnique([1, 2, 2, 3])).toBe(false);
        expect(isUnique(['a', 'b', 'a'])).toBe(false);
        expect(isUnique([NaN, NaN])).toBe(false);
    });

    test('输入包含 NaN 的数组', () => {
        expect(isUnique([1, 2, NaN, 3])).toBe(true);
        expect(isUnique([NaN, 1, NaN])).toBe(false);
    });

    test('空数组', () => {
        expect(isUnique([])).toBe(true);
    });
});
