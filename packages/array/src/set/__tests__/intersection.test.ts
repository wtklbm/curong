import { intersection } from '..';

describe('@curong/array/set/intersection', () => {
    test('测试1: 基本数字数组', () => {
        const a = [1, 2, 3];
        const b = [2, 3, 4, 5];
        expect(intersection(a, b)).toEqual([2, 3]);
    });

    test('测试2: 字符串数组', () => {
        const a = ['apple', 'banana'];
        const b = ['banana', 'cherry', 'apple', 'date'];
        expect(intersection(a, b)).toEqual(['apple', 'banana']);
    });

    test('测试3: 完全相同的数组', () => {
        const a = [10, 20, 30];
        const b = [10, 20, 30];
        expect(intersection(a, b)).toEqual([10, 20, 30]);
    });

    test('测试4: 完全不同的数组', () => {
        const a = ['a', 'b'];
        const b = ['c', 'd'];
        expect(intersection(a, b)).toEqual([]);
    });

    test('测试5: 布尔值数组', () => {
        const a = [true, false];
        const b = [false, true, true];
        expect(intersection(a, b)).toEqual([true, false]);
    });

    test('测试6: 第一个数组为空', () => {
        const a: number[] = [];
        const b = [1, 2, 3];
        expect(intersection(a, b)).toEqual([]);
    });

    test('测试7: 第二个数组为空', () => {
        const a = [1, 2, 3];
        const b: number[] = [];
        expect(intersection(a, b)).toEqual([]);
    });

    test('测试8: 两个空数组', () => {
        const a: number[] = [];
        const b: number[] = [];
        expect(intersection(a, b)).toEqual([]);
    });

    test('测试9: 包含null和undefined', () => {
        const a = [null, undefined, 1, 2];
        const b = [null, 2, 3];
        expect(intersection(a, b)).toEqual([null, 2]);
    });

    test('测试10: 大数据集', () => {
        const a = Array.from({ length: 1000 }, (_, i) => i);
        const b = Array.from({ length: 500 }, (_, i) => i * 2);
        const result = intersection(a, b);
        expect(result.length).toBe(500); // 0到998中的偶数
        expect(result).toEqual(Array.from({ length: 500 }, (_, i) => i * 2));
    });

    test('测试11: 重复元素', () => {
        const a = [1, 1, 2, 2, 3, 3];
        const b = [2, 2, 3, 3, 4, 4];
        expect(intersection(a, b)).toEqual([2, 3]);
    });

    test('测试12: 混合类型', () => {
        const a = [1, 'a', true, null];
        const b = [1, 'b', true, undefined];
        expect(intersection(a, b)).toEqual([1, true]);
    });

    test('测试13: 对象类型', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const a = [obj1, obj2];
        const b = [obj1, { id: 3 }];
        expect(intersection(a, b)).toEqual([obj1]);
    });
});
