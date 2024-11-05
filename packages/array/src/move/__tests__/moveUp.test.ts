import { moveUp } from '..';

describe('@curong/string/moveUp', () => {
    test('测试1', () => {
        const arr = [1, 2, 3, 4];

        expect(moveUp(arr, -1)).toEqual([1, 2, 4, 3]);
        expect(() => moveUp(arr, -1.2)).toThrow();
        expect(moveUp(arr, -4)).toEqual([1, 2, 3, 4]);
        expect(() => moveUp(arr, -5)).toThrow();
        expect(() => moveUp(arr, 1.2)).toThrow();

        expect(() => moveUp(arr, 1, -1.2)).toThrow();
        expect(() => moveUp(arr, 1, -1)).toThrow();
        expect(() => moveUp(arr, 1, 1.2)).toThrow();
    });

    test('测试2', () => {
        const arr = [1, 2, 3, 4];

        expect(moveUp([], 0)).toEqual([]);
        expect(moveUp(arr, 0)).toEqual(arr);
        expect(moveUp(arr, 2)).toEqual([1, 3, 2, 4]);
        expect(moveUp(arr, 1, 0)).toEqual(arr);
        expect(moveUp(arr, 1, 1)).toEqual([2, 1, 3, 4]);
        expect(moveUp(arr, 3, 2)).toEqual([1, 4, 2, 3]);
    });

    test('测试3', () => {
        const arr = [1, 2, 3];
        expect(moveUp(arr, -1)).toEqual([1, 3, 2]);
        expect(moveUp(arr, 0)).toEqual([1, 2, 3]);
        expect(moveUp(arr, 1)).toEqual([2, 1, 3]);
        expect(moveUp(arr, 2)).toEqual([1, 3, 2]);
        expect(() => moveUp(arr, 3)).toThrow();

        expect(moveUp(arr, -1, 2)).toEqual([3, 1, 2]);
        expect(moveUp(arr, 0, 2)).toEqual([1, 2, 3]);
        expect(moveUp(arr, 1, 2)).toEqual([2, 1, 3]);
        expect(moveUp(arr, 2, 2)).toEqual([3, 1, 2]);
        expect(() => moveUp(arr, 3, 2)).toThrow();
    });
});
