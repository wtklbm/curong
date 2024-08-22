import { toArray } from '../src';

describe('@curong/array/toArray', () => {
    test('测试1', () => {
        expect(toArray(NaN)).toEqual([NaN]);
        expect(toArray(0)).toEqual([0]);
    });

    test('测试2', () => {
        expect(toArray(null)).toEqual([]);
        expect(toArray(undefined)).toEqual([]);

        expect(toArray(null, { allowNull: true })).toEqual([null]);
        expect(toArray(undefined, { allowNull: true })).toEqual([]);

        expect(toArray(null, { allowUndefined: true })).toEqual([]);
        expect(toArray(undefined, { allowUndefined: true })).toEqual([
            undefined
        ]);
    });

    test('测试3', () => {
        expect(toArray([])).toEqual([]);
        expect(toArray([1])).toEqual([1]);
        expect(toArray([[1], []])).toEqual([[1], []]);
    });
});
