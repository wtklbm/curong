import { mapRightAsync } from '..';

describe('@curong/array/mapRightAsync', () => {
    test('测试1: 传入空数组时，返回空数组', async () => {
        const mockCallback = jest.fn();
        const result = await mapRightAsync([], mockCallback);

        // 验证回调函数不应被调用
        expect(mockCallback).not.toHaveBeenCalled();

        // 验证返回值为空数组
        expect(result).toEqual([]);
    });

    test('测试2: 传入非空数组，回调函数从右到左按顺序执行，结果按顺序返回', async () => {
        const mockCallback = jest.fn(async value => value * 2);
        const arr = [1, 2, 3];
        const result = await mapRightAsync(arr, mockCallback);

        // 验证回调函数的调用次数
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);

        // 验证回调函数的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);

        // 验证返回结果的顺序
        expect(result).toEqual([6, 4, 2]);
    });

    test('测试3: 当回调函数的 Promise 被拒绝时，捕获并抛出异常', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(mapRightAsync(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 验证回调函数只被调用了一次（在出现异常时停止执行）
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('测试4: 验证回调函数按正确的顺序调用并返回结果', async () => {
        const mockCallback = jest.fn(
            async (value, index) => `值: ${value}, 索引: ${index}`
        );
        const arr = ['a', 'b', 'c'];
        const result = await mapRightAsync(arr, mockCallback);

        // 验证返回结果的顺序与内容
        expect(result).toEqual([
            '值: c, 索引: 2',
            '值: b, 索引: 1',
            '值: a, 索引: 0'
        ]);
    });
});
