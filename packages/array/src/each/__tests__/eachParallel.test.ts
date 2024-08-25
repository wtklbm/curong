import { eachParallel } from '..';

describe('@curong/array/eachParallel', () => {
    test('测试1: 空数组不执行回调函数', async () => {
        const mockCallback = jest.fn();
        await eachParallel([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试2: 非空数组执行回调函数', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        const arr = [1, 2, 3];
        await eachParallel(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, arr);
    });

    test('测试3: 回调函数返回 Promise 被拒绝时捕获错误', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(eachParallel(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 确保回调函数都被调用了
        expect(mockCallback).toHaveBeenCalledTimes(3);
    });

    test('测试4: 回调函数返回普通值（非 Promise）时正确处理', async () => {
        const mockCallback = jest.fn().mockImplementation(value => {
            if (value === 2) {
                return Promise.resolve();
            } else {
                return undefined; // 直接返回 undefined，相当于返回一个 resolved 的 Promise
            }
        });
        const arr = [1, 2, 3];
        await eachParallel(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, arr);
    });
});
