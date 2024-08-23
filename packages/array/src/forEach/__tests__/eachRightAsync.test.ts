import { eachRightAsync } from '..';

describe('@curong/array/eachRightAsync', () => {
    test('测试1: 空数组不执行回调函数', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        await eachRightAsync([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试2: 非空数组执行回调函数，且从末尾开始', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        const arr = [1, 2, 3];
        await eachRightAsync(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });

    test('测试3: 回调函数返回 true 时提前终止迭代', async () => {
        const mockCallback = jest
            .fn()
            .mockResolvedValueOnce(false)
            .mockResolvedValueOnce(true); // 返回 true 来终止迭代

        const arr = [1, 2, 3];
        await eachRightAsync(arr, mockCallback);

        // 确保回调函数只被调用了两次
        expect(mockCallback).toHaveBeenCalledTimes(2);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
    });

    test('测试4: 回调函数返回普通值（非 Promise）时正确处理', async () => {
        const mockCallback = jest
            .fn()
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce(undefined); // 全部返回 resolved 的 Promise

        const arr = [1, 2, 3];
        await eachRightAsync(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });

    test('测试5: 回调函数的 Promise 被拒绝时捕获错误', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(eachRightAsync(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 确保回调函数在抛出异常时停止调用
        expect(mockCallback).toHaveBeenCalledTimes(1); // 只调用了一次
    });
});
