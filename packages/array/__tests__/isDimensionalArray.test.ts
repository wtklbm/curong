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

    test('should return true for 2D array', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(isArrayDimensional(arr)).toBe(true);
    });

    test('should return false for 1D array', () => {
        const arr: number[] = [1, 2, 3, 4];
        expect(isArrayDimensional(arr)).toBe(false);
    });

    test('should return true for 3D array when depth is set to 3', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isArrayDimensional(arr, 3)).toBe(true);
    });

    test('should return false for 3D array when depth is set to 2', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isArrayDimensional(arr, 2)).toBe(false);
    });

    test('should throw an error for negative depth', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(() => {
            isArrayDimensional(arr, -1);
        }).toThrow();
    });
});
