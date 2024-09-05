import { isTimeoutMs } from '..';

describe('@curong/function/isTimeoutMs', () => {
    test('有效的超时数值', () => {
        expect(isTimeoutMs(1000)).toBe(true); // 常规的超时值
        expect(isTimeoutMs(2147483647)).toBe(true); // 最大值边界
    });

    test('超出范围的数值', () => {
        expect(isTimeoutMs(2147483648)).toBe(false); // 超过最大值
        expect(isTimeoutMs(-1)).toBe(false); // 负数
    });

    test('非整数数值', () => {
        expect(isTimeoutMs(100.5)).toBe(false); // 浮点数
        expect(isTimeoutMs(NaN)).toBe(false); // NaN
        expect(isTimeoutMs(Infinity)).toBe(false); // Infinity
    });

    test('非数值输入', () => {
        expect(isTimeoutMs('1000')).toBe(false); // 字符串
        expect(isTimeoutMs(true)).toBe(false); // 布尔值
        expect(isTimeoutMs(null)).toBe(false); // null
        expect(isTimeoutMs(undefined)).toBe(false); // undefined
        expect(isTimeoutMs({})).toBe(false); // 对象
        expect(isTimeoutMs([])).toBe(false); // 数组
    });

    test('边界测试', () => {
        expect(isTimeoutMs(0)).toBe(true); // 最小值
        expect(isTimeoutMs(2147483647)).toBe(true); // 最大值
    });
});
