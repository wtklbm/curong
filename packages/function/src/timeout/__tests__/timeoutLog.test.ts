import { timeoutLog } from '..';

describe('@curong/function/timeoutLog', () => {
    const f = (f: (...args: unknown[]) => void, message: string) => {
        const consoleSpy = jest.spyOn(console, 'log');
        f();
        expect(consoleSpy).toHaveBeenCalledWith(message);
    };

    test('测试1', async () => {
        expect(() => timeoutLog(NaN)).toThrow();
        expect(() => timeoutLog(Infinity)).toThrow();
        expect(() => timeoutLog(-Infinity)).toThrow();
        expect(() => timeoutLog(-1.5)).toThrow();
        expect(() => timeoutLog(-10)).toThrow();
        expect(() => timeoutLog(Number.MAX_VALUE)).toThrow();
        expect(() => timeoutLog(Number.MAX_SAFE_INTEGER)).toThrow();
        expect(() => timeoutLog(2 ** 31)).toThrow();
        expect(() => timeoutLog(1.5)).toThrow();
        expect(() => timeoutLog(2147483648)).toThrow();
    });
    test('测试2', async () => {
        f(() => timeoutLog(2 ** 31 - 1), '等待 24天 20:31:23.647');
        f(() => timeoutLog(0), '等待 0ms');
        f(() => timeoutLog(1), '等待 1ms');
        f(() => timeoutLog(999), '等待 999ms');
        f(() => timeoutLog(1000), '等待 00:00:01');
        f(() => timeoutLog(1000 * 59), '等待 00:00:59');
        f(() => timeoutLog(1000 * 60), '等待 00:01:00');
        f(() => timeoutLog(1000 * 60 * 59), '等待 00:59:00');
        f(() => timeoutLog(1000 * 60 * 60), '等待 01:00:00');
        f(() => timeoutLog(1000 * 60 * 59 * 23), '等待 22:37:00');
        f(() => timeoutLog(1000 * 60 * 60 * 23), '等待 23:00:00');
        f(() => timeoutLog(1000 * 60 * 59 * 24), '等待 23:36:00');
        f(() => timeoutLog(1000 * 60 * 60 * 24), '等待 1天');
        f(
            () => timeoutLog(1000 * 60 * 60 * 24, '还有{}的等待时间'),
            '还有1天的等待时间'
        );
        f(
            () =>
                timeoutLog(
                    1000 * 60 * 60 * 24,
                    '还有{}的等待时间，你要等待{}吗？'
                ),
            '还有1天的等待时间，你要等待1天吗？'
        );
    });
});
