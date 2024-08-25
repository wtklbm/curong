import { toObject } from '../src';

describe('@curong/array/toObject', () => {
    test('测试1: 传入空数组时，返回空对象', () => {
        const mockMakeKey = jest.fn();
        const mockMakeValue = jest.fn();
        const result = toObject([], mockMakeKey, mockMakeValue);

        // 验证回调函数不应被调用
        expect(mockMakeKey).not.toHaveBeenCalled();
        expect(mockMakeValue).not.toHaveBeenCalled();

        // 验证返回值为空对象
        expect(result).toEqual({});
    });

    test('测试2: 传入非空数组，回调函数按预期执行，返回正确的对象', () => {
        const array = [1, 2, 3];
        const mockMakeKey = jest.fn(value => `key${value}`);
        const mockMakeValue = jest.fn(value => `value${value}`);
        const result = toObject(array, mockMakeKey, mockMakeValue);

        // 验证回调函数的调用次数
        expect(mockMakeKey).toHaveBeenCalledTimes(array.length);
        expect(mockMakeValue).toHaveBeenCalledTimes(array.length);

        // 验证回调函数的参数
        array.forEach((value, index) => {
            expect(mockMakeKey).toHaveBeenNthCalledWith(index + 1, value);
            expect(mockMakeValue).toHaveBeenNthCalledWith(index + 1, value);
        });

        // 验证返回结果
        const expected = {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        };
        expect(result).toEqual(expected);
    });

    test('测试3: 确保键唯一性，后出现的键值对覆盖之前的', () => {
        const array = [1, 2, 2];
        const mockMakeKey = jest.fn(value => `key${value}`);
        const mockMakeValue = jest.fn(value => `value${value}`);
        const result = toObject(array, mockMakeKey, mockMakeValue);

        // 验证回调函数的调用次数
        expect(mockMakeKey).toHaveBeenCalledTimes(array.length);
        expect(mockMakeValue).toHaveBeenCalledTimes(array.length);

        // 验证返回结果
        const expected = {
            key1: 'value1',
            key2: 'value2' // 键 'key2' 的值被最后一个 '2' 覆盖
        };
        expect(result).toEqual(expected);
    });

    test('测试4: 验证回调函数的调用顺序与参数', () => {
        const array = ['a', 'b', 'c'];
        const mockMakeKey = jest.fn(value => value.toUpperCase());
        const mockMakeValue = jest.fn(value => `Value for ${value}`);
        const result = toObject(array, mockMakeKey, mockMakeValue);

        // 验证回调函数的参数和返回结果
        expect(result).toEqual({
            A: 'Value for a',
            B: 'Value for b',
            C: 'Value for c'
        });

        expect(mockMakeKey).toHaveBeenCalledWith('a');
        expect(mockMakeKey).toHaveBeenCalledWith('b');
        expect(mockMakeKey).toHaveBeenCalledWith('c');

        expect(mockMakeValue).toHaveBeenCalledWith('a');
        expect(mockMakeValue).toHaveBeenCalledWith('b');
        expect(mockMakeValue).toHaveBeenCalledWith('c');
    });
});
