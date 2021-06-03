import { splitByStep } from '../src';

describe('splitByStep', () => {
    test('测试1', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 1)).toEqual([
            [1],
            [2],
            [3],
            [4],
            [5],
            [6],
            [7],
            [8],
            [9],
            [10],
            [11]
        ]);
    });

    test('测试2', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 2)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [9, 10],
            [11]
        ]);
    });

    test('测试3', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 5)).toEqual([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11]
        ]);
    });

    test('测试4', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 10)).toEqual([
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [11]
        ]);
    });

    test('测试5', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(() => splitByStep(v, 1.5)).toThrow();
    });

    test('测试6', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 11)).toEqual([
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        ]);
    });
});
