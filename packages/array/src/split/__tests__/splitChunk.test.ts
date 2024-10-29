import { splitChunk } from '..';

describe('@curong/array/splitChunk', () => {
    test('测试1', () => {
        const v: any = [];

        expect(() => splitChunk(v, 0)).toThrow();
        expect(() => splitChunk(v, -1)).toThrow();
        expect(() => splitChunk(v, -1.2)).toThrow();

        expect(splitChunk(v, 1)).toEqual([[]]);
        expect(splitChunk(v, 2)).toEqual([[]]);
        expect(splitChunk(v, 30)).toEqual([[]]);
    });

    test('测试2', () => {
        const v: any = [0];

        expect(splitChunk(v, 1)).toEqual([[0]]);
        expect(splitChunk(v, 2)).toEqual([[0]]);
        expect(splitChunk(v, 30)).toEqual([[0]]);
    });

    /* prettier-ignore  */
    test('测试3', () => {
        const v = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        // @ts-ignore
        expect(() => splitChunk(v, 0, 'xxx')).toThrow();
        // @ts-ignore
        expect(() => splitChunk(v, 3, 'xxx')).toThrow();

        expect(splitChunk(v, 5)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11]]);
        expect(splitChunk(v, 5, 'start')).toEqual([ [ 1, 2, 3 ], [ 4, 5 ], [ 6, 7 ], [ 8, 9 ], [ 10, 11 ] ]);
        expect(splitChunk(v, 5, 'end')).toEqual([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10, 11 ] ]);

        expect(splitChunk(v, 3)).toEqual([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11 ] ]);
        expect(splitChunk(v, 3, 'start')).toEqual([ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10, 11 ] ]);
        expect(splitChunk(v, 3, 'end')).toEqual([ [ 1, 2, 3 ], [ 4, 5, 6, 7 ], [ 8, 9, 10, 11 ] ]);

        expect(splitChunk(v, 2)).toEqual([ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ], [ 11 ] ]);
        expect(splitChunk(v, 2, 'start')).toEqual([ [ 1, 2, 3, 4, 5, 6 ], [ 7, 8, 9, 10, 11 ] ]);
        expect(splitChunk(v, 2, 'end')).toEqual([ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10, 11 ] ]);

        expect(splitChunk(v, 1)).toEqual([ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] ]);
        expect(splitChunk(v, 1, 'start')).toEqual([ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] ]);
        expect(splitChunk(v, 1, 'end')).toEqual([ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] ]);
    });

    /* prettier-ignore  */
    test('测试4', () => {
        const v = [1, 2, 3, 4];

        expect(splitChunk(v, 2)).toEqual([ [1, 2], [3, 4] ]);
        expect(splitChunk(v, 2, 'start')).toEqual([ [1, 2], [3, 4] ]);
        expect(splitChunk(v, 2, 'end')).toEqual([ [1, 2], [3, 4] ]);

        expect(splitChunk(v, 3)).toEqual([ [1], [2], [3], [4] ]);
        expect(splitChunk(v, 3, 'start')).toEqual([ [1, 2], [3], [4] ]);
        expect(splitChunk(v, 3, 'end')).toEqual([ [1], [2], [3, 4] ]);
    });
});
