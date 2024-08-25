import { mapRight } from '..';

type CallbackResult<T, U> = {
    value: T;
    index: number;
    array: T[] | readonly T[];
    result: U;
};

describe('@curong/array/mapRight', () => {
    test('测试1', () => {
        const mockCallback = jest.fn();
        const result = mapRight([], mockCallback);

        // 验证回调函数不应被调用
        expect(mockCallback).not.toHaveBeenCalled();

        // 验证返回值为空数组
        expect(result).toEqual([]);
    });

    test('测试2', () => {
        const mockCallback = jest.fn(value => value * 2);
        const arr = [1, 2, 3];
        const result = mapRight(arr, mockCallback);

        // 验证回调函数的调用次数
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);

        // 验证回调函数的参数
        expect(mockCallback).toHaveBeenNthCalledWith(1, 3, 2, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, arr);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 1, 0, arr);

        // 验证返回结果的顺序
        expect(result).toEqual([6, 4, 2]);
    });

    test('测试3', () => {
        const mockCallback = jest.fn(
            (value, index) => `值: ${value}, 索引: ${index}`
        );
        const arr = ['a', 'b', 'c'];
        const result = mapRight(arr, mockCallback);

        // 验证回调函数的参数和顺序
        expect(result).toEqual([
            '值: c, 索引: 2',
            '值: b, 索引: 1',
            '值: a, 索引: 0'
        ]);
    });

    test('测试4', () => {
        const mockCallback = jest.fn(value => value + '!');
        const arr = ['apple', 'banana', 'cherry'];
        const result = mapRight(arr, mockCallback);

        // 验证回调函数的调用次数
        expect(mockCallback).toHaveBeenCalledTimes(arr.length);

        // 验证返回结果的顺序
        expect(result).toEqual(['cherry!', 'banana!', 'apple!']);
    });

    it('测试5', () => {
        const arr = [1, 2, 3];
        const callbackResults: CallbackResult<number, number>[] = [];
        const result = mapRight(arr, (value, index = 0, array = []) => {
            callbackResults.push({ value, index, array, result: value });
            return value;
        });

        const expectedResults = [
            { value: 3, index: 2, array: arr, result: 3 },
            { value: 2, index: 1, array: arr, result: 2 },
            { value: 1, index: 0, array: arr, result: 1 }
        ];
        const expectedMappedArray = [3, 2, 1];

        expect(callbackResults).toEqual(expectedResults);
        expect(result).toEqual(expectedMappedArray);
    });

    it('测试6', () => {
        const emptyArray: number[] = [];
        const callbackResults: CallbackResult<number, number>[] = [];
        const result = mapRight(emptyArray, (value, index = 0, array = []) => {
            callbackResults.push({ value, index, array, result: value });
            return value;
        });

        expect(callbackResults).toEqual([]);
        expect(result).toEqual([]);
    });

    it('测试7', () => {
        const arr = [1];
        const callbackResults: CallbackResult<number, number>[] = [];
        const result = mapRight(arr, (value, index = 0, array = []) => {
            callbackResults.push({ value, index, array, result: value });
            return value;
        });

        const expectedResults = [{ value: 1, index: 0, array: arr, result: 1 }];
        const expectedMappedArray = [1];

        expect(callbackResults).toEqual(expectedResults);
        expect(result).toEqual(expectedMappedArray);
    });
});
