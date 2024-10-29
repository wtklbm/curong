import { swap } from '../src';

describe('@curong/array/swap', () => {
    test('成功交换数组中两个元素的位置', () => {
        const arr = [1, 2, 3, 4];
        const result = swap(arr, 0, 2);
        expect(result).toEqual([3, 2, 1, 4]);
    });

    test('当索引相同，数组保持不变', () => {
        const arr = [1, 2, 3, 4];
        const result = swap(arr, 1, 1);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('交换数组的第一个和最后一个元素', () => {
        const arr = [1, 2, 3, 4];
        const result = swap(arr, 0, 3);
        expect(result).toEqual([4, 2, 3, 1]);
    });

    test('抛出 RangeError 异常：索引 i 超出范围', () => {
        const arr = [1, 2, 3, 4];
        expect(() => swap(arr, -1, 2)).toThrow(RangeError);
        expect(() => swap(arr, 4, 2)).toThrow(RangeError);
    });

    test('抛出 RangeError 异常：索引 j 超出范围', () => {
        const arr = [1, 2, 3, 4];
        expect(() => swap(arr, 2, -1)).toThrow(RangeError);
        expect(() => swap(arr, 2, 4)).toThrow(RangeError);
    });

    test('是原地交换且交换正常', () => {
        const arr = [1, 2, 3];
        expect(swap(arr, 0, 2)).toEqual([3, 2, 1]);
        expect(swap(arr, 1, 1)).toEqual([3, 2, 1]);
    });
});
