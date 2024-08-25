import { each } from '..';

describe('@curong/array/each', () => {
    test('测试1', () => {
        const array: number[] = [1, 2, 3];
        const ret: number[] = [];

        each(array, item => {
            ret.push(item);
            expect(item).toBeDefined();
        });

        expect(ret).toEqual(array);
        ret.length = 0;

        each(array, item => {
            ret.push(item);
            return true;
        });

        expect(ret).toEqual([1]);
    });

    test('测试2', () => {
        const mockCallback = jest.fn();
        each([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试3', () => {
        const mockCallback = jest.fn();
        const arr = [1, 2, 3];
        each(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, arr);
    });

    test('测试4', () => {
        const mockCallback = jest.fn(value => value === 2);
        const arr = [1, 2, 3];
        each(arr, mockCallback);

        // 确保回调函数只被调用了两次
        expect(mockCallback).toHaveBeenCalledTimes(2);

        // 验证每次调用的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
    });

    test('测试5', () => {
        const mockCallback = jest.fn(() => {
            throw new Error('测试错误');
        });
        const arr = [1, 2, 3];

        // 使用 expect 断言捕获异常
        expect(() => each(arr, mockCallback)).toThrow('测试错误');

        // 确保回调函数在抛出异常时停止调用
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
});
