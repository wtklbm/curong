import { isMultiDimensional } from '../src';

describe('@curong/types/isMultiDimensional', () => {
    test('测试1', () => {
        expect(isMultiDimensional([])).toBe(false);
        expect(isMultiDimensional([12])).toBe(false);
        expect(isMultiDimensional([12, 34])).toBe(false);
    });

    test('测试2', () => {
        expect(isMultiDimensional([[]])).toBe(true);
        expect(isMultiDimensional([[2]])).toBe(true);
        expect(isMultiDimensional([[2, 3]])).toBe(true);
    });

    test('should return true for 2D array', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 2)).toBe(true);
    });

    test('should return false for 1D array', () => {
        const arr: number[] = [1, 2, 3, 4];
        expect(isMultiDimensional(arr)).toBe(false);
        expect(isMultiDimensional(arr, 1)).toBe(false);
        expect(isMultiDimensional(arr, 2)).toBe(false);
    });

    test('should return true for 3D array when depth is set to 3', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 3)).toBe(true);
    });

    test('should return false for 3D array when depth is set to 2', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 2)).toBe(false);
    });

    test('should throw an error for negative depth', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(() => {
            isMultiDimensional(arr, -1);
        }).toThrow();
    });

    describe('isMultiDimensional', () => {
        it('should return false for arr1', () => {
            const arr1 = [1, 2, 3];
            expect(isMultiDimensional(arr1)).toBe(false);
            expect(isMultiDimensional(arr1, 1)).toBe(false);
        });

        it('should return true for arr2', () => {
            const arr2 = [
                [1, 2],
                [3, 4],
                [5, 6]
            ];
            expect(isMultiDimensional(arr2)).toBe(true);
            expect(isMultiDimensional(arr2, 2)).toBe(true);
        });

        it('should return true for arr3', () => {
            const arr3 = [
                [
                    [1, 2],
                    [3, 4]
                ],
                [
                    [5, 6],
                    [7, 8]
                ]
            ];
            expect(isMultiDimensional(arr3)).toBe(true);
            expect(isMultiDimensional(arr3, 3)).toBe(true);
        });

        it('should return true for arr4 with dimension 4', () => {
            const arr4 = [
                [
                    [
                        [1, 2],
                        [3, 4]
                    ],
                    [
                        [5, 6],
                        [7, 8]
                    ]
                ]
            ];
            expect(isMultiDimensional(arr4)).toBe(true);
            expect(isMultiDimensional(arr4, 4)).toBe(true);
        });

        it('should return true for arr5', () => {
            const arr5 = [[1, 2], 3, [4, 5], [], [6, 7, 8]];
            expect(isMultiDimensional(arr5)).toBe(false);
            expect(isMultiDimensional(arr5, 2)).toBe(false);
        });

        it('should return true for [[]]', () => {
            let arr: any = [[]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 2)).toBe(true);

            arr = [[[]]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 3)).toBe(true);

            arr = [[[[]]]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 4)).toBe(true);

            arr = [[[[[]]]]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 5)).toBe(true);
        });

        it('should return true for [[], 1]', () => {
            let arr: any = [[], 1];
            expect(isMultiDimensional(arr)).toBe(false);
            expect(isMultiDimensional(arr, 2)).toBe(false);

            arr = [[[], 1]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 2)).toBe(true);

            arr = [[[[], 1]]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 3)).toBe(true);

            arr = [[[[[], 1]]]];
            expect(isMultiDimensional(arr)).toBe(true);
            expect(isMultiDimensional(arr, 4)).toBe(true);
        });
    });
});
