import { last } from '..';

describe('@curong/array/last', () => {
    test('测试1: 输入空数组，返回 undefined', () => {
        const input: [] = [];
        const result = last(input);
        expect(result).toBeUndefined();
    });

    test('测试2: 输入数组，返回最后一个元素', () => {
        const input = [1, 2, 3];
        const result = last(input);
        expect(result).toBe(3);
    });

    test('测试3: 输入只有一个元素的数组，返回该元素', () => {
        const input = [42];
        const result = last(input);
        expect(result).toBe(42);
    });

    test('测试4: 输入包含不同类型元素的数组，返回最后一个元素', () => {
        const input = [1, 'a', true];
        const result = last(input);
        expect(result).toBe(true);
    });

    test('测试5: 输入数组，最后一个元素为 null，返回 null', () => {
        const input = [1, 2, null];
        const result = last(input);
        expect(result).toBeNull();
    });

    test('测试6: 输入数组，最后一个元素为 undefined，返回 undefined', () => {
        const input = [1, 2, undefined];
        const result = last(input);
        expect(result).toBeUndefined();
    });
});
