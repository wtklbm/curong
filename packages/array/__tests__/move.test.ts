import { move } from '../src';

describe('@curong/array/move', () => {
    test('测试1: 移动元素到目标位置', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, 1, 3);

        // 验证元素 2 从索引 1 移动到索引 3
        expect(result).toEqual([1, 3, 4, 2]);
    });

    test('测试2: 使用负索引移动元素', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, -3, 1); // 负索引 -3 对应索引 1

        // 验证元素 2 从索引 1 移动到索引 1（即不变）
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('测试3: 移动到自身位置', () => {
        const array = [1, 2, 3, 4];
        const result = move(array, 2, 2); // 从索引 2 移动到索引 2（即不变）

        // 验证数组保持不变
        expect(result).toEqual([1, 2, 3, 4]);
    });

    test('测试4: 起始位置或目标位置超出范围', () => {
        expect(move([1, 2, 3, 4], 1, 3)).toEqual([1, 3, 4, 2]);
        expect(() => move([1, 2, 3, 4], 1, 4)).toThrow();
        expect(() => move([1, 2, 3, 4], 1, 5)).toThrow();

        expect(move([1, 2, 3, 4], -4, -1)).toEqual([2, 3, 4, 1]);
        expect(() => move([1, 2, 3, 4], -5, -1)).toThrow();
        expect(() => move([1, 2, 3, 4], -6, -1)).toThrow();
    });

    test('测试5: 只有一个元素的数组', () => {
        expect(move([1], 0, 0)).toEqual([1]);
    });

    test('测试6: 多次移动操作', () => {
        const array = [1, 2, 3, 4, 5];
        move(array, 0, 4); // 1 -> 5
        const result = move(array, 3, 1); // 4 -> 2

        // 验证多次移动操作的结果
        expect(result).toEqual([2, 5, 3, 4, 1]);
    });
});
