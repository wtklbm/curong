import { difference } from '..';

describe('@curong/array/set/difference', () => {
    test('测试1: 基本数字数组', () => {
        const a = [1, 2, 3, 4];
        const b = [2, 3, 5];
        expect(difference(a, b)).toEqual([1, 4]);
    });

    test('测试2: 字符串数组', () => {
        const a = ['apple', 'banana', 'cherry'];
        const b = ['banana', 'date'];
        expect(difference(a, b)).toEqual(['apple', 'cherry']);
    });

    test('测试3: 完全相同的数组', () => {
        const a = [10, 20, 30];
        const b = [10, 20, 30];
        expect(difference(a, b)).toEqual([]);
    });

    test('测试4: 完全不同的数组', () => {
        const a = ['a', 'b', 'c'];
        const b = ['d', 'e', 'f'];
        expect(difference(a, b)).toEqual(['a', 'b', 'c']);
    });

    test('测试5: 布尔值数组', () => {
        const a = [true, false, true];
        const b = [false];
        expect(difference(a, b)).toEqual([true]);
    });

    test('测试6: 第一个数组为空', () => {
        const a: number[] = [];
        const b = [1, 2, 3];
        expect(difference(a, b)).toEqual([]);
    });

    test('测试7: 第二个数组为空', () => {
        const a = [1, 2, 3];
        const b: number[] = [];
        expect(difference(a, b)).toEqual([1, 2, 3]);
    });

    test('测试8: 两个空数组', () => {
        const a: number[] = [];
        const b: number[] = [];
        expect(difference(a, b)).toEqual([]);
    });

    test('测试9: 包含null和undefined', () => {
        const a = [null, undefined, 1, 2];
        const b = [null, 2];
        expect(difference(a, b)).toEqual([undefined, 1]);
    });

    test('测试10: 大数据集', () => {
        const a = Array.from({ length: 1000 }, (_, i) => i);
        const b = Array.from({ length: 500 }, (_, i) => i * 2);
        const result = difference(a, b);
        expect(result.length).toBe(500); // 1000个数中有500个偶数被移除
        expect(result).toEqual(
            Array.from({ length: 1000 }, (_, i) => i).filter(n => n % 2 !== 0)
        );
    });

    test('测试11: 重复元素', () => {
        const a = [1, 1, 2, 2, 3, 3];
        const b = [2, 2, 4, 4];
        expect(difference(a, b)).toEqual([1, 3]);
    });

    test('测试12: 混合类型', () => {
        const a = [1, 'a', true, null];
        const b = [1, 'b', false];
        expect(difference(a, b)).toEqual(['a', true, null]);
    });

    test('测试13: 对象类型', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const obj3 = { id: 3 };
        const a = [obj1, obj2, obj3];
        const b = [obj2];
        expect(difference(a, b)).toEqual([obj1, obj3]);
    });
});