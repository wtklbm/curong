import { flat } from '..';

describe('flat', () => {
    test('测试1: 输入为空数组，返回空数组', () => {
        expect(flat()).toEqual([]);
    });

    test('测试2: 输入为单个元素，返回包含该元素的数组', () => {
        expect(flat(1)).toEqual([1]);
    });

    test('测试3: 输入为单个数组，返回扁平化后的数组', () => {
        expect(flat([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('测试4: 输入为嵌套数组，返回扁平化后的数组', () => {
        expect(flat([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('测试5: 输入为多个数组，返回扁平化后的数组', () => {
        expect(flat([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('测试6: 输入为混合数组和元素，返回扁平化后的数组', () => {
        expect(flat(1, [2, 3], 4, [5, [6, 7]])).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('测试7: 输入为包含 null 和 undefined 的数组，返回扁平化后的数组', () => {
        expect(flat(null, [undefined, [null, undefined]], 1)).toEqual([
            null,
            undefined,
            null,
            undefined,
            1
        ]);
    });

    test('测试8: 输入为包含对象的数组，返回扁平化后的数组', () => {
        const obj1: any = { a: 1 };
        const obj2: any = { b: 2 };
        expect(flat(obj1, [obj2, [obj1]])).toEqual([obj1, obj2, obj1]);
    });

    test('测试9: 输入为包含空数组的数组，返回扁平化后的数组', () => {
        expect(flat([], [[]], [[], []])).toEqual([]);
    });

    test('测试10: 输入为包含非数组和数组的混合情况，返回扁平化后的数组', () => {
        expect(flat(1, [2, [3, [4, [5]]]], 6, [7, [8, [9, [10]]]])).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]);
    });

    test('测试11: 测试嵌套结构', () => {
        expect(flat([1, [[[[[[[2]]]]]]], [3, [4], [[[[5]]]], 6]])).toEqual([
            1, 2, 3, 4, 5, 6
        ]);
    });
});
