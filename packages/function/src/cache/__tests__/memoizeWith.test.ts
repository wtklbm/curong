// @ts-nocheck

import { memoizeWith } from '..';

describe('@curong/function/memoizeWith', () => {
    test('测试1: 应缓存函数的结果', () => {
        const mockFunc = jest.fn((a: number, b: number) => a + b);
        const harsher = (a: number, b: number) => `${a}-${b}`;
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        // 调用函数
        expect(memoizedFunc(1, 2)).toBe(3);
        expect(memoizedFunc(1, 2)).toBe(3);

        // 确保原始函数只被调用一次
        expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    test('测试2: 不同的输入应缓存并返回不同的结果', () => {
        const mockFunc = jest.fn((a: number, b: number) => a + b);
        const harsher = (a: number, b: number) => `${a}-${b}`;
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        expect(memoizedFunc(1, 2)).toBe(3);
        expect(memoizedFunc(2, 3)).toBe(5);

        // 确保函数被正确调用两次
        expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    test('测试3: 应使用自定义缓存类型', () => {
        const mockFunc = jest.fn((a: number) => a * 2);
        const harsher = (a: number) => a;

        class CustomCache extends Map {}

        memoizeWith.cacheInitializer = CustomCache;
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        expect(memoizedFunc(2)).toBe(4);
        expect(memoizedFunc(2)).toBe(4);

        // 确保原始函数只被调用一次
        expect(mockFunc).toHaveBeenCalledTimes(1);

        // 验证缓存类型
        expect(memoizedFunc.clear).toBeInstanceOf(Function);
        memoizedFunc.clear();
        expect(memoizedFunc.cache.size).toBe(0);
    });

    test('测试4: 应清除缓存', () => {
        const mockFunc = jest.fn((a: number) => a * 2);
        const harsher = (a: number) => a;
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        expect(memoizedFunc(2)).toBe(4);
        memoizedFunc.clear();
        expect(memoizedFunc(2)).toBe(4);

        // 确保函数被调用两次（缓存清除后再次调用）
        expect(mockFunc).toHaveBeenCalledTimes(2);
        expect(memoizedFunc.cache.size).toBe(1);
    });

    test('测试5: 处理函数抛出异常的情况', () => {
        const mockFunc = jest.fn((a: number) => {
            if (a < 0) {
                throw new Error('Invalid input');
            }
            return a * 2;
        });
        const harsher = (a: number) => a;
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        expect(() => memoizedFunc(-1)).toThrow('Invalid input');

        // 尝试重新调用相同参数，应再次抛出异常（未缓存异常结果）
        expect(() => memoizedFunc(-1)).toThrow('Invalid input');

        // 确保原始函数被调用两次，因为异常不应缓存
        expect(mockFunc).toHaveBeenCalledTimes(2);
        expect(memoizedFunc.cache.size).toBe(0);
    });

    test('测试6: 应正确使用 harsher 生成的键进行缓存', () => {
        const mockFunc = jest.fn((a: string) => a.toUpperCase());
        const harsher = (a: string) => a.charAt(0);
        const memoizedFunc = memoizeWith(mockFunc, harsher);

        expect(memoizedFunc('apple')).toBe('APPLE');
        expect(memoizedFunc('apricot')).toBe('APPLE');

        // 确保原始函数只被调用一次（因 harsher 生成相同的键）
        expect(mockFunc).toHaveBeenCalledTimes(1);
        expect(memoizedFunc.cache.size).toBe(1);
    });
});