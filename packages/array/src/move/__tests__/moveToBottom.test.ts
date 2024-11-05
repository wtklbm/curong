import { moveToBottom } from '..';

describe('@curong/string/moveToBottom', () => {
    test('测试1', () => {
        const arr = [1, 2, 3, 4];

        expect(() => moveToBottom(arr, -5)).toThrow();
        expect(() => moveToBottom(arr, -4.1)).toThrow();
        expect(() => moveToBottom(arr, 1.2)).toThrow();
    });

    test('测试2', () => {
        const arr = [1, 2, 3, 4];

        expect(moveToBottom([], 0)).toEqual([]);
        expect(moveToBottom(arr, 3)).toEqual(arr);
        expect(moveToBottom(arr, 1)).toEqual([1, 3, 4, 2]);
    });

    test('测试3', () => {
        const arr = [1, 2, 3];
        expect(moveToBottom(arr, -1)).toEqual([1, 2, 3]);
        expect(moveToBottom(arr, -3)).toEqual([2, 3, 1]);
        expect(moveToBottom(arr, 0)).toEqual([2, 3, 1]);
        expect(moveToBottom(arr, 1)).toEqual([1, 3, 2]);
        expect(moveToBottom(arr, 2)).toEqual([1, 2, 3]);
        expect(() => moveToBottom(arr, 3)).toThrow();
    });
});
