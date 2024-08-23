import { eachRightParallel } from '..';

describe('@curong/array/eachRightParallel', () => {
    test('测试1: 空数组不执行回调函数', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        await eachRightParallel([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试2: 非空数组执行回调函数，且从末尾开始并行执行', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        const arr = [1, 2, 3];
        await eachRightParallel(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });

    test('测试3: 回调函数返回 Promise 被拒绝时捕获错误', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(eachRightParallel(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 确保回调函数在抛出异常时停止调用
        expect(mockCallback).toHaveBeenCalledTimes(3);
    });

    test('测试4: 回调函数返回普通值（非 Promise）时正确处理', async () => {
        const mockCallback = jest
            .fn()
            .mockImplementationOnce(() => undefined)
            .mockImplementationOnce(() => undefined)
            .mockImplementationOnce(() => undefined); // 全部返回 undefined，相当于 resolved 的 Promise

        const arr = [1, 2, 3];
        await eachRightParallel(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });
});
