import { isArraySparse } from '..';

describe('@curong/types/isArraySparse', () => {
    test('测试1', () => {
        const sparseArray: (number | undefined)[] = [
            1,
            undefined,
            2,
            undefined,
            undefined,
            3
        ];

        expect(isArraySparse(sparseArray)).toBe(false);
    });

    test('测试2', () => {
        const sparseObject: { [key: string]: number | undefined } = {
            a: 1,
            b: undefined,
            c: 2,
            d: undefined,
            e: 3
        };
        expect(isArraySparse(sparseObject)).toBe(false);
    });

    test('测试3', () => {
        const sparseString: string = 'a b  c   d';
        expect(isArraySparse(sparseString)).toBe(false);
    });

    test('测试4', () => {
        const sparse2DArray: (number | undefined)[][] = [
            [1, undefined, 2],
            [undefined, undefined, 3],
            [4, undefined, undefined]
        ];
        expect(isArraySparse(sparse2DArray)).toBe(false);
    });

    test('测试5', () => {
        const sparseSet: Set<number | undefined> = new Set([
            1,
            undefined,
            2,
            undefined,
            3
        ]);
        expect(isArraySparse(sparseSet)).toBe(false);
    });

    test('测试6', () => {
        const sparseMap: Map<string, number | undefined> = new Map([
            ['a', 1],
            ['b', undefined],
            ['c', 2],
            ['d', undefined],
            ['e', 3]
        ]);
        expect(isArraySparse(sparseMap)).toBe(false);
    });

    test('测试7', () => {
        const sparseArray: (number | undefined)[] = [1, , 2, , , 3];

        expect(isArraySparse(sparseArray)).toBe(true);
    });

    test('测试8', () => {
        const sparse2DArray: (number | undefined)[][] = [
            [1, , 2],
            [, , 3],
            [4, ,]
        ];
        expect(isArraySparse(sparse2DArray)).toBe(false);
    });

    test('测试9', () => {
        const sparseArray: (number | undefined)[] = [1, 2, , 3];

        expect(isArraySparse(sparseArray)).toBe(true);
    });
});
