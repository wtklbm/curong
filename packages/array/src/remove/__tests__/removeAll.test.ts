import { removeAll } from '..';

describe('@curong/array/removeAll', () => {
    test('测试1: 移除数组中的单个目标元素，返回 true', () => {
        const array = [1, 2, 3, 4];
        const result = removeAll(array, 2);
        expect(result).toBe(true);
        expect(array).toEqual([1, 3, 4]);
    });

    test('测试2: 移除数组中多个相同的目标元素，返回 true', () => {
        const array = [1, 2, 2, 3, 2, 4];
        const result = removeAll(array, 2);
        expect(result).toBe(true);
        expect(array).toEqual([1, 3, 4]);
    });

    test('测试3: 目标元素不存在于数组中，返回 false', () => {
        const array = [1, 2, 3, 4];
        const result = removeAll(array, 5);
        expect(result).toBe(false);
        expect(array).toEqual([1, 2, 3, 4]);
    });

    test('测试4: 数组为空，返回 false', () => {
        const array: number[] = [];
        const result = removeAll(array, 1);
        expect(result).toBe(false);
        expect(array).toEqual([]);
    });

    test('测试5: 移除数组中对象类型的元素，返回 true', () => {
        const obj = { id: 1 };
        const array = [obj, { id: 2 }, obj];
        const result = removeAll(array, obj);
        expect(result).toBe(true);
        expect(array).toEqual([{ id: 2 }]);
    });

    test('测试6: 移除 NaN 元素，返回 true', () => {
        const array = [NaN, 1, NaN, 2];
        const result = removeAll(array, NaN);
        expect(result).toBe(true);
        expect(array).toEqual([1, 2]);
    });

    test('测试7: 移除 null 元素，返回 true', () => {
        const array = [null, 1, null, 2];
        const result = removeAll(array, null);
        expect(result).toBe(true);
        expect(array).toEqual([1, 2]);
    });

    test('测试8: 移除 undefined 元素，返回 true', () => {
        const array = [undefined, 1, undefined, 2];
        const result = removeAll(array, undefined);
        expect(result).toBe(true);
        expect(array).toEqual([1, 2]);
    });

    test('测试9: 移除字符串类型的元素，返回 true', () => {
        const array = ['a', 'b', 'a', 'c'];
        const result = removeAll(array, 'a');
        expect(result).toBe(true);
        expect(array).toEqual(['b', 'c']);
    });

    test('测试10: 移除所有匹配的值后，数组为空', () => {
        const array = [1, 1, 1];
        const result = removeAll(array, 1);
        expect(result).toBe(true);
        expect(array).toEqual([]);
    });

    test('测试11: 移除 NaN，返回 true', () => {
        const array = [1, NaN, 1, NaN];
        const result = removeAll(array, NaN);
        expect(result).toBe(true);
        expect(array).toEqual([1, 1]);
    });
});
