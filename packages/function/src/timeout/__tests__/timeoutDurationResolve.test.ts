import { timeoutDurationResolve } from '..';

describe('@curong/function/timeoutDurationResolve', () => {
    test('测试1', async () => {
        expect(() => timeoutDurationResolve(NaN)).toThrow();
        expect(() => timeoutDurationResolve(-Infinity)).toThrow();
        expect(() => timeoutDurationResolve(Infinity)).toThrow();
        expect(() => timeoutDurationResolve({ start: NaN })).toThrow();
        expect(() => timeoutDurationResolve({ end: NaN })).toThrow();
        expect(() => timeoutDurationResolve({ start: NaN, end: 10 })).toThrow();
        expect(() => timeoutDurationResolve({ start: 0, end: NaN })).toThrow();
        expect(() => timeoutDurationResolve(-1.5)).toThrow();
        expect(() => timeoutDurationResolve(2147483648)).toThrow();
    });
    test('测试2', async () => {
        expect(timeoutDurationResolve(-1)).toBe(0);
        expect(timeoutDurationResolve(2147483647)).toBe(2147483647);
        expect(timeoutDurationResolve('1000')).toBe(1000);
        expect(timeoutDurationResolve(() => 1)).toBe(1);
        expect(
            timeoutDurationResolve(() => ({ start: 0, end: 10 }))
        ).toBeTruthy();
        expect(timeoutDurationResolve([1])).toBe(1);
        expect(timeoutDurationResolve([{ start: 10 }])).toBeTruthy();
        expect(timeoutDurationResolve([{ end: 10 }])).toBeTruthy();
        expect(timeoutDurationResolve([{ start: 0, end: 10 }])).toBeTruthy();
    });
});
