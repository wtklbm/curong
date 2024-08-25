import { eachAsync } from '..';

describe('@curong/array/eachAsync', () => {
    test('测试1', async () => {
        const array: number[] = [1, 2, 3];
        const ret: number[] = [];

        await eachAsync(array, async item => {
            await new Promise(resolve => setTimeout(resolve, 10));
            ret.push(item);
            expect(item).toBeDefined();
        });

        expect(ret).toEqual(array);
        ret.length = 0;

        await eachAsync(array, async item => {
            await new Promise(resolve => setTimeout(resolve, 10));
            ret.push(item);
            return true;
        });

        expect(ret).toEqual([1]);
    });


    test('测试2', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        await eachAsync([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试3', async () => {
        const mockCallback = jest.fn().mockResolvedValue(undefined);
        const arr = [1, 2, 3];
        await eachAsync(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, arr);
    });

    test('测试4', async () => {
        const mockCallback = jest.fn()
            .mockResolvedValueOnce(false)
            .mockResolvedValueOnce(true); // 返回 true 来终止迭代

        const arr = [1, 2, 3];
        await eachAsync(arr, mockCallback);

        // 确保回调函数只被调用了两次
        expect(mockCallback).toHaveBeenCalledTimes(2);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
    });

    test('测试5', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(eachAsync(arr, mockCallback)).rejects.toThrow('测试错误');

        // 确保回调函数在抛出异常时停止调用
        expect(mockCallback).toHaveBeenCalledTimes(1); // 只调用了一次
    });
});
