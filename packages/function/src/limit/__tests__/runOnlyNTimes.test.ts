import { runOnlyNTimes } from '..';

describe('@curong/function/runOnlyNTimes', () => {
    test('测试1', async () => {
        expect(() => {
            runOnlyNTimes(NaN, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            runOnlyNTimes(-1, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            runOnlyNTimes(1, async (message: string) => message, 'Hello');
        }).toThrow();
    });

    test('测试2', async () => {
        const limitedCallback = runOnlyNTimes(
            3,
            (message: string) => message,
            'Hello'
        );

        expect(limitedCallback()).toBe('Hello');
        expect(limitedCallback()).toBe('Hello');
        expect(limitedCallback()).toBe('Hello');
        expect(limitedCallback()).toBe(undefined);
        expect(limitedCallback()).toBe(undefined);
        expect(limitedCallback()).toBe(undefined);
        expect(limitedCallback()).toBe(undefined);
        expect(limitedCallback()).toBe(undefined);
    });

    test('测试3', async () => {
        const limitedCallback = runOnlyNTimes(3, (message: string) => message);

        expect(limitedCallback('Hello')).toBe('Hello');
        expect(limitedCallback('Hello')).toBe('Hello');
        expect(limitedCallback('Hello')).toBe('Hello');
        expect(limitedCallback('Hello')).toBe(undefined);
        expect(limitedCallback('Hello')).toBe(undefined);
        expect(limitedCallback('Hello')).toBe(undefined);
        expect(limitedCallback('Hello')).toBe(undefined);
        expect(limitedCallback('Hello')).toBe(undefined);
    });
});
