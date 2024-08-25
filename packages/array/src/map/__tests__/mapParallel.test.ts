import { mapParallel } from '..';

describe('@curong/array/mapParallel', () => {
    test('测试1: 传入空数组时，返回空数组', async () => {
        const mockCallback = jest.fn();
        const result = await mapParallel([], mockCallback);

        // 验证回调函数不应被调用
        expect(mockCallback).not.toHaveBeenCalled();

        // 验证返回值为空数组
        expect(result).toEqual([]);
    });

    test('测试2: 传入非空数组，回调函数正常执行，结果按顺序返回', async () => {
        const mockCallback = jest.fn(async value => value * 2);
        const arr = [1, 2, 3];
        const result = await mapParallel(arr, mockCallback);

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

    test('测试3: 回调函数的 Promise 被拒绝时，捕获并抛出异常', async () => {
        const mockCallback = jest.fn().mockRejectedValue(new Error('测试错误'));
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        await expect(mapParallel(arr, mockCallback)).rejects.toThrow(
            '测试错误'
        );

        // 验证回调函数可能已经被全部调用，但由于是并行执行，异常仍然会被抛出
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);
    });

    test('测试4: 验证回调函数并行执行', async () => {
        const mockCallback = jest.fn(async value => {
            await new Promise(resolve => setTimeout(resolve, 100)); // 每次调用等待 100ms
            return value * 2;
        });
        const arr = [1, 2, 3];

        const start = Date.now();
        const result = await mapParallel(arr, mockCallback);
        const duration = Date.now() - start;

        // 验证执行时间应接近 100ms，确保是并行执行而不是串行
        expect(duration).toBeLessThan(200);

        // 验证返回结果
        expect(result).toEqual([2, 4, 6]);
    });
});
