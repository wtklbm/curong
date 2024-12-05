import { union } from '..';

describe('@curong/array/set/union', () => {
    test('测试1: 基本数字数组', () => {
        const a = [1, 2, 3];
        const b = [2, 3, 4, 5];
        expect(union(a, b)).toEqual([1, 2, 3, 4, 5]);
    });

    test('测试2: 字符串数组', () => {
        const a = ['apple', 'banana'];
        const b = ['banana', 'cherry', 'apple', 'date'];
        expect(union(a, b)).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    test('测试3: 完全相同的数组', () => {
        const a = [10, 20, 30];
        const b = [10, 20, 30];
        expect(union(a, b)).toEqual([10, 20, 30]);
    });

    test('测试4: 完全不同的数组', () => {
        const a = ['a', 'b'];
        const b = ['c', 'd'];
        expect(union(a, b)).toEqual(['a', 'b', 'c', 'd']);
    });

    test('测试5: 布尔值数组', () => {
        const a = [true, false];
        const b = [false, true, true];
        expect(union(a, b)).toEqual([true, false]);
    });

    test('测试6: 第一个数组为空', () => {
        const a: number[] = [];
        const b = [1, 2, 3];
        expect(union(a, b)).toEqual([1, 2, 3]);
    });

    test('测试7: 第二个数组为空', () => {
        const a = [1, 2, 3];
        const b: number[] = [];
        expect(union(a, b)).toEqual([1, 2, 3]);
    });

    test('测试8: 两个空数组', () => {
        const a: number[] = [];
        const b: number[] = [];
        expect(union(a, b)).toEqual([]);
    });

    test('测试9: 包含null和undefined', () => {
        const a = [null, undefined];
        const b = [null, undefined, 1, 2];
        expect(union(a, b)).toEqual([null, undefined, 1, 2]);
    });

    test('测试10: 大数据集', () => {
        const a = Array.from({ length: 1000 }, (_, i) => i);
        const b = Array.from({ length: 1200 }, (_, i) => i);
        const result = union(a, b);
        expect(result).toEqual(Array.from({ length: 1200 }, (_, i) => i));
    });

    test('测试11: 重复元素', () => {
        const a = [1, 1, 2, 2];
        const b = [2, 2, 3, 3];
        expect(union(a, b)).toEqual([1, 2, 3]);
    });

    test('测试12: 混合类型', () => {
        const a = [1, 'a', true];
        const b = [1, 'b', false];
        expect(union(a, b)).toEqual([1, 'a', true, 'b', false]);
    });

    test('测试13: 对象类型', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const a = [obj1];
        const b = [obj1, obj2];
        expect(union(a, b)).toEqual([obj1, obj2]);
    });
});
