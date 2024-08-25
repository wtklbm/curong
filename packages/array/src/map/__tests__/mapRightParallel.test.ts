import { mapRightParallel } from '..';

describe('@curong/array/mapRightParallel', () => {
    test('测试1: 传入空数组时，返回空数组', async () => {
        const mockCallback = jest.fn();
        const result = await mapRightParallel([], mockCallback);

        // 验证回调函数不应被调用
        expect(mockCallback).not.toHaveBeenCalled();

        // 验证返回值为空数组
        expect(result).toEqual([]);
    });

    test('测试2: 传入非空数组，回调函数从右到左并行执行，结果按顺序返回', async () => {
        const mockCallback = jest.fn(async value => value * 2);
        const arr = [1, 2, 3];
        const result = await mapRightParallel(arr, mockCallback);

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
        await expect(mapRightParallel(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 验证回调函数可能已经被全部调用，因为它们是并行执行的
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);
    });

    test('测试4: 验证回调函数并行执行', async () => {
        const mockCallback = jest.fn(async value => {
            await new Promise(resolve => setTimeout(resolve, 100)); // 每次调用等待 100ms
            return value * 2;
        });
        const arr = [1, 2, 3];

        const start = Date.now();
        const result = await mapRightParallel(arr, mockCallback);
        const duration = Date.now() - start;

        // 验证执行时间应接近 100ms，确保是并行执行而不是串行
        expect(duration).toBeLessThan(200);

        // 验证返回结果的顺序
        expect(result).toEqual([6, 4, 2]);
    });
});
