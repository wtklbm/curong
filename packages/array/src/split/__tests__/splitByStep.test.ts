import { splitByStep } from '..';

describe('@curong/array/splitByStep', () => {
    test('测试1', () => {
        const v: any = [];

        expect(() => splitByStep(v, 0)).toThrow();
        expect(() => splitByStep(v, -1)).toThrow();
        expect(() => splitByStep(v, -1.2)).toThrow();

        expect(splitByStep(v, 1)).toEqual([[]]);
        expect(splitByStep(v, 2)).toEqual([[]]);
        expect(splitByStep(v, 30)).toEqual([[]]);
    });

    test('测试2', () => {
        const v: any = [0];

        expect(splitByStep(v, 1)).toEqual([[0]]);
        expect(splitByStep(v, 2)).toEqual([[0]]);
        expect(splitByStep(v, 30)).toEqual([[0]]);
    });

    test('测试3', () => {
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

    test('测试4', () => {
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

    test('测试5', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 5)).toEqual([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11]
        ]);
    });

    test('测试6', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 10)).toEqual([
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [11]
        ]);
    });

    test('测试7', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(() => splitByStep(v, 1.5)).toThrow();
    });

    test('测试8', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        expect(splitByStep(v, 11)).toEqual([
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        ]);
    });
});
