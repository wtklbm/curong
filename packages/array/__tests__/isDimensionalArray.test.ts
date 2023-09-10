import { isDimensionalArray } from '../src';

describe('@curong/types/isDimensionalArray', () => {
    test('测试1', () => {
        expect(isDimensionalArray([])).toBe(false);
        expect(isDimensionalArray([12])).toBe(false);
        expect(isDimensionalArray([12, 34])).toBe(false);
    });

    test('测试2', () => {
        expect(isDimensionalArray([[]])).toBe(true);
        expect(isDimensionalArray([[2]])).toBe(true);
        expect(isDimensionalArray([[2, 3]])).toBe(true);
    });

    test('should return true for 2D array', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(isDimensionalArray(arr)).toBe(true);
    });

    test('should return false for 1D array', () => {
        const arr: number[] = [1, 2, 3, 4];
        expect(isDimensionalArray(arr)).toBe(false);
    });

    test('should return true for 3D array when depth is set to 3', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isDimensionalArray(arr, 3)).toBe(true);
    });

    test('should return false for 3D array when depth is set to 2', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isDimensionalArray(arr, 2)).toBe(false);
    });

    test('should throw an error for negative depth', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(() => {
            isDimensionalArray(arr, -1);
        }).toThrow();
    });
});
