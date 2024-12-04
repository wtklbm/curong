import { uniqueBy } from '..';

describe('@curong/array/uniqueBy', () => {
    test('测试1: 使用自定义的比较函数去重', () => {
        const array = [{ id: 1 }, { id: 2 }, { id: 1 }];
        const result = uniqueBy(array, (a, b) => a.id === b.id);
        expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    test('测试2: 数组中所有元素唯一，返回原数组', () => {
        const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const result = uniqueBy(array, (a, b) => a.id === b.id);
        expect(result).toEqual(array);
    });

    test('测试3: 数组为空，返回空数组', () => {
        const result = uniqueBy([], (a, b) => a === b);
        expect(result).toEqual([]);
    });

    test('测试4: 使用自定义比较函数对基本数据类型数组去重', () => {
        const array = [1, 2, 2, 3, 3];
        const result = uniqueBy(array, (a, b) => a === b);
        expect(result).toEqual([1, 2, 3]);
    });

    test('测试5: 数组包含不同类型的元素，使用自定义比较函数去重', () => {
        const array1 = [1, '1', 2, '2', 1];
        const result1 = uniqueBy(array1, (a, b) => String(a) === String(b));
        expect(result1).toEqual([1, 2]);

        const array2 = ['1', 1, '2', 2, 1];
        const result2 = uniqueBy(array2, (a, b) => String(a) === String(b));
        expect(result2).toEqual(['1', '2']);
    });

    test('测试6: 数组包含对象元素，使用自定义函数去重', () => {
        const array = [{ name: 'John' }, { name: 'Jane' }, { name: 'John' }];
        const result = uniqueBy(array, (a, b) => a.name === b.name);
        expect(result).toEqual([{ name: 'John' }, { name: 'Jane' }]);
    });

    test('测试7: 使用引用相等去重数组中的对象', () => {
        const obj = { id: 1 };
        const array = [obj, obj, obj];
        const result = uniqueBy(array, (a, b) => a === b);
        expect(result).toEqual([obj]);
    });

    test('测试8: 数组包含 NaN 元素，使用自定义函数去重', () => {
        const array = [NaN, 1, NaN, 2];
        const result = uniqueBy(
            array,
            (a, b) => Number.isNaN(a) && Number.isNaN(b)
        );
        expect(result).toEqual([NaN, 1, 2]);
    });

    test('测试9: 使用自定义比较函数对数组去重，去除重复的元素', () => {
        const array = [
            { id: 1, name: 'a' },
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
        ];
        const result = uniqueBy(
            array,
            (a, b) => a.id === b.id && a.name === b.name
        );
        expect(result).toEqual([
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
        ]);
    });

    test('测试10: 数组为空或无重复元素时，返回原数组', () => {
        const array = [{ id: 1 }];
        const result = uniqueBy(array, (a, b) => a.id === b.id);
        expect(result).toEqual(array);
    });
});
