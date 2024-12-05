import { fromValue } from '..';

describe('@curong/array/fromValue ', () => {
    test('测试1', () => {
        expect(fromValue(NaN)).toEqual([NaN]);
        expect(fromValue(0)).toEqual([0]);
    });

    test('测试2', () => {
        expect(fromValue(null)).toEqual([]);
        expect(fromValue(undefined)).toEqual([]);

        expect(fromValue(null, { allowNull: true })).toEqual([null]);
        expect(fromValue(undefined, { allowNull: true })).toEqual([]);

        expect(fromValue(null, { allowUndefined: true })).toEqual([]);
        expect(fromValue(undefined, { allowUndefined: true })).toEqual([
            undefined
        ]);
    });

    test('测试3', () => {
        expect(fromValue([])).toEqual([]);
        expect(fromValue([1])).toEqual([1]);
        expect(fromValue([[1], []])).toEqual([[1], []]);
    });
});
