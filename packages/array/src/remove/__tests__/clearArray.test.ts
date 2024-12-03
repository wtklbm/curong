import { clearArray } from '..';

describe('@curong/utils/clearArray', () => {
    test('测试1: 输入非空数组，清空后返回被删除的元素', () => {
        const arr = [1, 2, 3];
        const result = clearArray(arr);
        expect(result).toEqual([1, 2, 3]);
        expect(arr).toEqual([]);
    });

    test('测试2: 输入空数组，返回空数组', () => {
        const arr: number[] = [];
        const result = clearArray(arr);
        expect(result).toEqual([]);
        expect(arr).toEqual([]);
    });

    test('测试3: 输入包含字符串元素的数组，返回被删除的元素', () => {
        const arr = ['a', 'b', 'c'];
        const result = clearArray(arr);
        expect(result).toEqual(['a', 'b', 'c']);
        expect(arr).toEqual([]);
    });

    test('测试4: 输入包含对象的数组，返回被删除的元素', () => {
        const arr = [{ a: 1 }, { b: 2 }];
        const result = clearArray(arr);
        expect(result).toEqual([{ a: 1 }, { b: 2 }]);
        expect(arr).toEqual([]);
    });

    test('测试5: 输入包含混合类型元素的数组，返回被删除的元素', () => {
        const arr = [1, 'a', true, { b: 2 }];
        const result = clearArray(arr);
        expect(result).toEqual([1, 'a', true, { b: 2 }]);
        expect(arr).toEqual([]);
    });

    test('测试6: 多次调用 clearArray，第一次返回原数组的元素，第二次返回空数组', () => {
        const arr = [1, 2, 3];
        const firstCall = clearArray(arr);
        const secondCall = clearArray(arr);
        expect(firstCall).toEqual([1, 2, 3]);
        expect(secondCall).toEqual([]);
        expect(arr).toEqual([]);
    });
});
