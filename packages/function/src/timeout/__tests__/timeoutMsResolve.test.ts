import { timeoutMsResolve } from '..';

describe('@curong/function/timeoutMsResolve', () => {
    test('测试1', async () => {
        expect(() => timeoutMsResolve(NaN)).toThrow();
        expect(() => timeoutMsResolve(-Infinity)).toThrow();
        expect(() => timeoutMsResolve(Infinity)).toThrow();
        expect(() => timeoutMsResolve({ start: NaN })).toThrow();
        expect(() => timeoutMsResolve({ end: NaN })).toThrow();
        expect(() => timeoutMsResolve({ start: NaN, end: 10 })).toThrow();
        expect(() => timeoutMsResolve({ start: 0, end: NaN })).toThrow();
        expect(() => timeoutMsResolve(-1.5)).toThrow();
        expect(() => timeoutMsResolve(2147483648)).toThrow();
    });
    test('测试2', async () => {
        expect(timeoutMsResolve(-1)).toBe(0);
        expect(timeoutMsResolve(2147483647)).toBe(2147483647);
        expect(timeoutMsResolve('1000')).toBe(1000);
        expect(timeoutMsResolve(() => 1)).toBe(1);
        expect(timeoutMsResolve(() => ({ start: 0, end: 10 }))).toBeTruthy();
        expect(timeoutMsResolve([1])).toBe(1);
        expect(timeoutMsResolve([{ start: 10 }])).toBeTruthy();
        expect(timeoutMsResolve([{ end: 10 }])).toBeTruthy();
        expect(timeoutMsResolve([{ start: 0, end: 10 }])).toBeTruthy();
    });
});
