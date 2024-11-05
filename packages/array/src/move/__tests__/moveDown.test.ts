import { moveDown } from '..';

describe('@curong/string/moveDown', () => {
    test('测试1', () => {
        const arr = [1, 2, 3, 4];

        expect(moveDown(arr, -1)).toEqual(arr);
        expect(() => moveDown(arr, -1.2)).toThrow();
        expect(moveDown(arr, -4)).toEqual([2, 1, 3, 4]);
        expect(() => moveDown(arr, -5)).toThrow();
        expect(() => moveDown(arr, 1.2)).toThrow();

        expect(() => moveDown(arr, 1, -1.2)).toThrow();
        expect(() => moveDown(arr, 1, -1)).toThrow();
        expect(() => moveDown(arr, 1, 1.2)).toThrow();
    });

    test('测试2', () => {
        const arr = [1, 2, 3, 4];

        expect(moveDown([], 0)).toEqual([]);
        expect(moveDown(arr, 0)).toEqual([2, 1, 3, 4]);
        expect(moveDown(arr, 1)).toEqual([1, 3, 2, 4]);
        expect(moveDown(arr, 3)).toEqual(arr);
        expect(moveDown(arr, 1, 0)).toEqual(arr);
        expect(moveDown(arr, 1, 1)).toEqual([1, 3, 2, 4]);
        expect(moveDown(arr, 1, 2)).toEqual([1, 3, 4, 2]);
    });

    test('测试3', () => {
        const arr: any[] = [1, 2, 3];
        expect(moveDown(arr, 0)).toEqual([2, 1, 3]);
        expect(moveDown(arr, 1)).toEqual([1, 3, 2]);
        expect(moveDown(arr, 2)).toEqual([1, 2, 3]);
        expect(() => moveDown(arr, 3)).toThrow();

        expect(moveDown(arr, 0, 2)).toEqual([2, 3, 1]);
        expect(moveDown(arr, 1, 2)).toEqual([1, 3, 2]);
        expect(moveDown(arr, 2, 2)).toEqual([1, 2, 3]);
        expect(() => moveDown(arr, 3, 2)).toThrow();
    });
});
