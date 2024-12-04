import { includesEvery } from '..';

describe('@curong/utils/includesEvery', () => {
    test('测试1: value 数组包含 array 数组的所有元素，返回 true', () => {
        const value = [1, 2, 3, 4, 5];
        const array = [2, 4];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试2: value 数组不包含 array 数组的所有元素，返回 false', () => {
        const value = [1, 2, 3, 4, 5];
        const array = [2, 6];
        expect(includesEvery(value, array)).toBe(false);
    });

    test('测试3: value 数组与 array 数组完全相等，返回 true', () => {
        const value = [1, 2, 3];
        const array = [1, 2, 3];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试4: value 数组为空，返回 false', () => {
        const value: number[] = [];
        const array = [1];
        expect(includesEvery(value, array)).toBe(false);
    });

    test('测试5: array 数组为空，返回 true', () => {
        const value = [1, 2, 3];
        const array: number[] = [];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试6: array 数组长度大于 value 数组长度，返回 false', () => {
        const value = [1, 2];
        const array = [1, 2, 3];
        expect(includesEvery(value, array)).toBe(false);
    });

    test('测试7: value 数组包含重复元素，但 array 不重复，返回 true', () => {
        const value = [1, 1, 2, 3, 4];
        const array = [1, 2];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试8: value 和 array 都包含重复元素，返回 true', () => {
        const value = [1, 1, 2, 3, 4];
        const array = [1, 1, 2];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试9: array 包含元素是 value 的子集，但顺序不同，返回 true', () => {
        const value = [3, 2, 1];
        const array = [1, 2];
        expect(includesEvery(value, array)).toBe(true);
    });

    test('测试10: array 包含元素是 value 的子集，但顺序与 value 不同，返回 true', () => {
        const value = [5, 4, 3, 2, 1];
        const array = [1, 3, 5];
        expect(includesEvery(value, array)).toBe(true);
    });
});
