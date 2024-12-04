import { ensureArray  } from '..';

describe('@curong/array/ensureArray ', () => {
    test('测试1', () => {
        expect(ensureArray (NaN)).toEqual([NaN]);
        expect(ensureArray (0)).toEqual([0]);
    });

    test('测试2', () => {
        expect(ensureArray (null)).toEqual([]);
        expect(ensureArray (undefined)).toEqual([]);

        expect(ensureArray (null, { allowNull: true })).toEqual([null]);
        expect(ensureArray (undefined, { allowNull: true })).toEqual([]);

        expect(ensureArray (null, { allowUndefined: true })).toEqual([]);
        expect(ensureArray (undefined, { allowUndefined: true })).toEqual([
            undefined
        ]);
    });

    test('测试3', () => {
        expect(ensureArray ([])).toEqual([]);
        expect(ensureArray ([1])).toEqual([1]);
        expect(ensureArray ([[1], []])).toEqual([[1], []]);
    });
});
