import { move } from '..';

describe('@curong/string/move', () => {
    test('测试1', () => {
        expect(move([1, 2, 3, 4], -4, 1)).toEqual([2, 1, 3, 4]);
        expect(move([1, 2, 3, 4], 0, -4)).toEqual([1, 2, 3, 4]);
        expect(move([1, 2, 3, 4], -4, -4)).toEqual([1, 2, 3, 4]);

        expect(() => move([1, 2, 3, 4], -5, 1)).toThrow();
        expect(() => move([1, 2, 3, 4], 0, -5)).toThrow();
        expect(() => move([1, 2, 3, 4], -5, -5)).toThrow();

        expect(() => move([1, 2, 3, 4], 4, 1)).toThrow();
        expect(() => move([1, 2, 3, 4], 0, 4)).toThrow();
        expect(() => move([1, 2, 3, 4], 4, 4)).toThrow();

        expect(() => move([1, 2, 3, 4], 1, 10)).toThrow();
    });

    test('测试2', () => {
        expect(move([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
        expect(move([1, 2, 3, 4], 2, 2)).toEqual([1, 2, 3, 4]);
        expect(move([1, 2, 3, 4], -1, 3)).toEqual([1, 2, 3, 4]);
    });

    test('测试3', () => {
        const arr = [1, 2, 3];
        expect(move(arr, 0, 1)).toEqual([2, 1, 3]);
        expect(move(arr, 1, 1)).toEqual([1, 2, 3]);
        expect(() => move(arr, 0, 5)).toThrow();
        expect(() => move(arr, 7, 1)).toThrow();
    });

    test('测试4', () => {
        const arr2: any[] = [];
        expect(move(arr2, 0, 1)).toEqual([]);
        expect(move(arr2, 1, 1)).toEqual([]);
        expect(move([], 0, 1)).toEqual([]);
    });

    test('测试5', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(move(arr, 3, 0)).toEqual([4, 1, 2, 3, 5]);
        expect(move(arr, -1, 0)).toEqual([5, 1, 2, 3, 4]);
        expect(move(arr, 1, -2)).toEqual([1, 3, 4, 2, 5]);
        expect(move(arr, -3, -4)).toEqual([1, 3, 2, 4, 5]);
    });

    test('测试6', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, 1, 3);
        expect(result).toEqual([1, 3, 4, 2]);
    });

    test('测试7', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, -3, 1);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('测试8', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, 2, 2);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('测试9', () => {
        expect(move([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
        expect(() => move([1, 2, 3, 4], 1, 4)).toThrow();
        expect(() => move([1, 2, 3, 4], 1, 5)).toThrow();

        expect(move([1, 2, 3, 4], -4, -1)).toEqual([2, 3, 4, 1]);
        expect(() => move([1, 2, 3, 4], -5, -1)).toThrow();
        expect(() => move([1, 2, 3, 4], -6, -1)).toThrow();
    });

    test('测试10', () => {
        expect(move([1], 0, 0)).toEqual([1]);
    });
});
