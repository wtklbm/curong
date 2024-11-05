import { moveToTop } from '..';

describe('@curong/string/moveToTop', () => {
    test('测试1', () => {
        const arr = [1, 2, 3, 4];

        expect(() => moveToTop(arr, -10)).toThrow();
        expect(() => moveToTop(arr, -4.1)).toThrow();
        expect(() => moveToTop(arr, 1.2)).toThrow();
    });

    test('测试2', () => {
        const arr = [1, 2, 3, 4];

        expect(moveToTop(arr, 2)).toEqual([3, 1, 2, 4]);
        expect(moveToTop(arr, 0)).toEqual(arr);
        expect(moveToTop([], 0)).toEqual([]);
    });

    test('测试3', () => {
        const arr = [1, 2, 3];
        expect(moveToTop(arr, -1)).toEqual([3, 1, 2]);
        expect(moveToTop(arr, -3)).toEqual([1, 2, 3]);
        expect(moveToTop(arr, 0)).toEqual([1, 2, 3]);
        expect(moveToTop(arr, 1)).toEqual([2, 1, 3]);
        expect(moveToTop(arr, 2)).toEqual([3, 1, 2]);
        expect(() => moveToTop(arr, 3)).toThrow();
    });
});
