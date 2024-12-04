import { mapToArray } from '..';

describe('@curong/array/mapToArray', () => {
    test('测试1: 生成指定长度的数组，默认 mapFn 返回索引', () => {
        const result = mapToArray(5);
        expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    test('测试2: 生成指定长度的数组，使用自定义 mapFn', () => {
        const result = mapToArray(3, index => `item-${index}`);
        expect(result).toEqual(['item-0', 'item-1', 'item-2']);
    });

    test('测试3: 生成长度为 0 的空数组', () => {
        const result = mapToArray(0);
        expect(result).toEqual([]);
    });

    test('测试4: 生成长度为 1 的数组，默认 mapFn 返回索引', () => {
        const result = mapToArray(1);
        expect(result).toEqual([0]);
    });

    test('测试5: 生成长度为 1 的数组，使用自定义 mapFn', () => {
        const result = mapToArray(1, index => `item-${index}`);
        expect(result).toEqual(['item-0']);
    });

    test('测试6: 生成长度为 3 的数组，使用自定义 mapFn 返回数字的平方', () => {
        const result = mapToArray(3, index => index * index);
        expect(result).toEqual([0, 1, 4]);
    });

    test('测试7: 生成长度为 5 的数组，使用自定义 mapFn 返回索引的字符串表示', () => {
        const result = mapToArray(5, index => `index-${index}`);
        expect(result).toEqual([
            'index-0',
            'index-1',
            'index-2',
            'index-3',
            'index-4'
        ]);
    });
});
