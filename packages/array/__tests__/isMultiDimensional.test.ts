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

    test('测试3', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 2)).toBe(true);
    });

    test('测试4', () => {
        const arr: number[] = [1, 2, 3, 4];
        expect(isMultiDimensional(arr)).toBe(false);
        expect(() => isMultiDimensional(arr, 1)).toThrow();
        expect(isMultiDimensional(arr, 2)).toBe(false);
    });

    test('测试5', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 3)).toBe(true);
    });

    test('测试6', () => {
        const arr: number[][][] = [
            [[1], [2]],
            [[3], [4]]
        ];
        expect(isMultiDimensional(arr)).toBe(true);
        expect(isMultiDimensional(arr, 2)).toBe(true);
        expect(isMultiDimensional(arr, 2, true)).toBe(false);
    });

    test('测试7', () => {
        const arr: number[][] = [
            [1, 2],
            [3, 4]
        ];
        expect(() => {
            isMultiDimensional(arr, -1);
        }).toThrow();
    });

    test('测试8', () => {
        const arr1 = [1, 2, 3];
        expect(isMultiDimensional(arr1)).toBe(false);
        expect(() => isMultiDimensional(() => arr1, 1)).toThrow();
    });

    test('测试9', () => {
        const arr2 = [
            [1, 2],
            [3, 4],
            [5, 6]
        ];
        expect(isMultiDimensional(arr2)).toBe(true);
        expect(isMultiDimensional(arr2, 2)).toBe(true);
    });

    test('测试10', () => {
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

    test('测试11', () => {
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

    test('测试12', () => {
        const arr5 = [[1, 2], 3, [4, 5], [], [6, 7, 8]];
        expect(isMultiDimensional(arr5)).toBe(false);
        expect(isMultiDimensional(arr5, 2)).toBe(false);
    });

    test('测试13', () => {
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

    test('测试14', () => {
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

    test('测试15', () => {
        expect(isMultiDimensional([])).toBe(false);
        expect(isMultiDimensional([[]])).toBe(true);
        expect(() => isMultiDimensional([[]], 1)).toThrow();
        expect(isMultiDimensional([1, 2, 3, 4])).toBe(false);
        expect(isMultiDimensional([[1, 2, 3, 4]], 2)).toBe(true);
        expect(isMultiDimensional([[1, 2, 3, 4]], 2, true)).toBe(true);
        expect(() => isMultiDimensional([[1, 2, 3, 4]], 1)).toThrow();
        expect(() => isMultiDimensional([[1, 2, 3, 4]], 1, true)).toThrow();
        expect(
            isMultiDimensional([
                [1, 2],
                [3, 4]
            ])
        ).toBe(true);
        expect(isMultiDimensional([[[1, 2]], [[3, 4]]], 3)).toBe(true);
    });
});
