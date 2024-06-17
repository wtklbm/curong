import { isFloat } from '..';

describe('@curong/types/isFloat', () => {
    test('测试1', () => {
        expect(isFloat(12.0)).toBe(false);
        expect(isFloat(Math.pow(2, 52) + 0.1)).toBe(false);
        expect(isFloat(Math.pow(2, 52) - 0.25)).toBe(false);
    });

    test('测试2', () => {
        expect(isFloat(0.0001)).toBe(true);
        expect(isFloat(15.2)).toBe(true);
        expect(isFloat(Math.pow(2, 52) - 0.251)).toBe(true);
    });

    test('测试3', () => {
        expect(isFloat(1.5)).toBe(true);
        expect(isFloat(-3.2)).toBe(true);
        expect(isFloat(0.25)).toBe(true);
    });

    test('测试4', () => {
        expect(isFloat(1)).toBe(false); // 整数
        expect(isFloat(-5)).toBe(false); // 整数
        expect(isFloat(0)).toBe(false); // 整数
        expect(isFloat(NaN)).toBe(false); // NaN 不是有限数
        expect(isFloat(Infinity)).toBe(false); // Infinity 不是有限数
        expect(isFloat('3.14')).toBe(false); // 字符串
        expect(isFloat(null)).toBe(false); // Null
        expect(isFloat(undefined)).toBe(false); // Undefined
        expect(isFloat({})).toBe(false); // 对象
        expect(isFloat([])).toBe(false); // 数组
        expect(isFloat(true)).toBe(false); // 布尔值
    });

    test('测试5', () => {
        expect(isFloat(Number.MAX_SAFE_INTEGER)).toBe(false); // 最大安全整数
        expect(isFloat(Number.MIN_SAFE_INTEGER)).toBe(false); // 最小安全整数
    });
});
