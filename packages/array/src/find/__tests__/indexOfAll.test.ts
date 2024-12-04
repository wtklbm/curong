import { indexOfAll } from '..';

describe('@curong/utils/indexOfAll', () => {
    test('测试1: 数组包含多个相同的元素，返回所有索引', () => {
        const result = indexOfAll([1, 2, 3, 1, 4, 1], 1);
        expect(result).toEqual([0, 3, 5]);
    });

    test('测试2: 数组只包含一个元素，返回该元素的索引', () => {
        const result = indexOfAll([1], 1);
        expect(result).toEqual([0]);
    });

    test('测试3: 数组中不包含目标元素，返回空数组', () => {
        const result = indexOfAll([1, 2, 3, 4], 5);
        expect(result).toEqual([]);
    });

    test('测试4: 数组为空，返回空数组', () => {
        const result = indexOfAll([], 1);
        expect(result).toEqual([]);
    });

    test('测试5: 数组包含不同类型的元素，返回正确的索引', () => {
        const result = indexOfAll([1, '1', 2, 1], 1);
        expect(result).toEqual([0, 3]);
    });

    test('测试6: 数组中元素为对象，使用引用比较，返回正确的索引', () => {
        const obj = { id: 1 };
        const result = indexOfAll([obj, { id: 2 }, obj], obj);
        expect(result).toEqual([0, 2]);
    });

    test('测试7: 数组中元素为 NaN，返回正确的索引', () => {
        const result = indexOfAll([NaN, 1, NaN, 2], NaN);
        expect(result).toEqual([0, 2]);
    });

    test('测试8: 查找值为 null，返回正确的索引', () => {
        const result = indexOfAll([null, 1, null, 2], null);
        expect(result).toEqual([0, 2]);
    });

    test('测试9: 查找字符串值时，返回正确的索引', () => {
        const result = indexOfAll(['a', 'b', 'a', 'c'], 'a');
        expect(result).toEqual([0, 2]);
    });

    test('测试10: 查找值为 undefined，返回正确的索引', () => {
        const result = indexOfAll([undefined, 1, undefined, 2], undefined);
        expect(result).toEqual([0, 2]);
    });
});
