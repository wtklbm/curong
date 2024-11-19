import { complement } from '..';

describe('@curong/array/set/complement', () => {
    test('测试1', () => {
        const a = [1, 2, 3];
        const b = [2, 3, 4, 5];
        expect(complement(a, b)).toEqual([4, 5]);
    });

    test('测试2', () => {
        const a = ['apple', 'banana'];
        const b = ['banana', 'cherry', 'apple', 'date'];
        expect(complement(a, b)).toEqual(['cherry', 'date']);
    });

    test('测试3', () => {
        const a = [10, 20, 30];
        const b = [10, 20, 30];
        expect(complement(a, b)).toEqual([]);
    });

    test('测试4', () => {
        const a = ['a', 'b'];
        const b = ['b', 'c', 'd'];
        expect(complement(a, b)).toEqual(['c', 'd']);
    });

    test('测试5', () => {
        const a = [true, false];
        const b = [false, true, true];
        expect(complement(a, b)).toEqual([]);
    });

    test('测试6: 空集合', () => {
        const a: number[] = [];
        const b = [1, 2, 3];
        expect(complement(a, b)).toEqual([1, 2, 3]);
    });

    test('测试7: 全集为空', () => {
        const a = [1, 2, 3];
        const b: number[] = [];
        expect(complement(a, b)).toEqual([]);
    });

    test('测试8: 两个空集合', () => {
        const a: number[] = [];
        const b: number[] = [];
        expect(complement(a, b)).toEqual([]);
    });

    test('测试9: 包含null和undefined', () => {
        const a = [null, undefined];
        const b = [null, undefined, 1, 2];
        expect(complement(a, b)).toEqual([1, 2]);
    });

    test('测试10: 大数据集', () => {
        const a = Array.from({ length: 1000 }, (_, i) => i);
        const b = Array.from({ length: 1200 }, (_, i) => i);
        const result = complement(a, b);
        expect(result).toEqual(Array.from({ length: 200 }, (_, i) => i + 1000));
    });

    test('测试11: 重复元素', () => {
        const a = [1, 1, 2, 2];
        const b = [1, 1, 2, 2, 3, 3];
        expect(complement(a, b)).toEqual([3]);
    });

    test('测试12: 混合类型', () => {
        const a = [1, 'a', true];
        const b = [1, 'a', true, false, 2, 'b'];
        expect(complement(a, b)).toEqual([false, 2, 'b']);
    });

    test('测试13: 对象类型', () => {
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        const a = [obj1];
        const b = [obj1, obj2];
        expect(complement(a, b)).toEqual([obj2]);
    });

    test('测试14: 性能测试', () => {
        const start = Date.now();
        const a = Array.from({ length: 10000 }, (_, i) => i);
        const b = Array.from({ length: 20000 }, (_, i) => i);
        complement(a, b);
        const end = Date.now();
        expect(end - start).toBeLessThan(1000);
    });
});
