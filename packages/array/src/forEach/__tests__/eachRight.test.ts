import { eachRight } from '..';

describe('@curong/array/eachRight', () => {
    test('测试1: 空数组不执行回调函数', () => {
        const mockCallback = jest.fn();
        eachRight([], mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('测试2: 非空数组执行回调函数，且从末尾开始', () => {
        const mockCallback = jest.fn();
        const arr = [1, 2, 3];
        eachRight(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });

    test('测试3: 回调函数返回 true 时提前终止迭代', () => {
        const mockCallback = jest
            .fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true); // 返回 true 来终止迭代

        const arr = [1, 2, 3];
        eachRight(arr, mockCallback);

        // 确保回调函数只被调用了两次
        expect(mockCallback).toHaveBeenCalledTimes(2);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
    });

    test('测试4: 回调函数始终返回 false，不提前终止迭代', () => {
        const mockCallback = jest.fn().mockReturnValue(false);
        const arr = [1, 2, 3];
        eachRight(arr, mockCallback);

        // 确保回调函数被调用了三次
        expect(mockCallback).toHaveBeenCalledTimes(3);

        // 验证每次调用的参数（从末尾开始）
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);
    });
});
