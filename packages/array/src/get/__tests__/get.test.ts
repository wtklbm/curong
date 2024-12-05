import { get } from '..';

describe('@curong/array/get', () => {
    test('测试1: 输入空数组，返回 undefined', () => {
        const input: [] = [];
        const result = get(input, 0);
        expect(result).toBeUndefined();
    });

    test('测试2: 输入数组，索引有效，返回对应元素', () => {
        const input = [1, 2, 3];
        const result = get(input, 1);
        expect(result).toBe(2);
    });

    test('测试3: 输入数组，索引为负数，返回对应元素', () => {
        const input = [1, 2, 3];
        const result = get(input, -1);
        expect(result).toBe(3);
    });

    test('测试4: 输入数组，索引超出范围，返回 undefined', () => {
        const input = [1, 2, 3];
        const result = get(input, 5);
        expect(result).toBeUndefined();
    });

    test('测试5: 输入数组，负数索引超出范围，返回 undefined', () => {
        const input = [1, 2, 3];
        const result = get(input, -5);
        expect(result).toBeUndefined();
    });

    test('测试6: 输入为一个元素的数组，返回该元素', () => {
        const input = [42];
        const result = get(input, 0);
        expect(result).toBe(42);
    });

    test('测试7: 输入为一个元素的数组，负索引返回该元素', () => {
        const input = [42];
        const result = get(input, -1);
        expect(result).toBe(42);
    });

    test('测试8: 输入包含多类型元素的数组，返回指定索引的元素', () => {
        const input = [1, 'string', true];
        const result = get(input, 1);
        expect(result).toBe('string');
    });
});
