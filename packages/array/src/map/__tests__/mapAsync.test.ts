import { mapAsync } from '..';

describe('@curong/array/mapAsync', () => {
    test('测试1: 传入空数组时，返回空数组', async () => {
        const mockCallback = jest.fn();
        const result = await mapAsync([], mockCallback);

        // 验证回调函数不应被调用
        expect(mockCallback).not.toHaveBeenCalled();

        // 验证返回值为空数组
        expect(result).toEqual([]);
    });

    test('测试2: 传入非空数组，回调函数执行正常，结果按顺序返回', async () => {
        const mockCallback = jest.fn(async value => value * 2);
        const arr = [1, 2, 3];
        const result = await mapAsync(arr, mockCallback);

        // 验证回调函数的调用次数
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);

        // 验证回调函数的参数
        arr.forEach((value, index) => {
            expect(mockCallback).toHaveBeenNthCalledWith(
                index + 1,
                value,
                index,
                arr
            );
        });

        // 验证返回结果
        expect(result).toEqual([2, 4, 6]);
    });

    test('测试3: 当回调函数返回 Promise 被拒绝时，函数抛出异常', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(mapAsync(arr, mockCallback)).rejects.toThrow('测试错误');

        // 验证回调函数只被调用了一次（在出现异常时停止执行）
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    test('测试4: 验证回调函数的调用顺序与结果收集的顺序一致', async () => {
        const mockCallback = jest.fn(
            async (value, index) => `值: ${value}, 索引: ${index}`
        );
        const arr = [10, 20, 30];
        const result = await mapAsync(arr, mockCallback);

        // 验证返回结果与预期一致
        expect(result).toEqual([
            '值: 10, 索引: 0',
            '值: 20, 索引: 1',
            '值: 30, 索引: 2'
        ]);
    });
});
