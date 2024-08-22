import { runAfterTimes } from '..';

describe('@curong/function/runAfterTimes', () => {
    test('测试1', async () => {
        expect(() => {
            runAfterTimes(NaN, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            runAfterTimes(-1, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            runAfterTimes(1, async (message: string) => message, 'Hello');
        }).toThrow();
    });

    test('测试2', () => {
        let r = runAfterTimes(3, () => 10);
        let ret = r();
        ret = r();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试3', () => {
        let r = runAfterTimes(3, () => 10);

        expect(r()()()).toBe(10);
    });

    test('测试4', () => {
        let r = runAfterTimes(3, () => 10);
        let ret = r();
        ret = r()();

        expect(ret).toBe(10);
    });

    test('测试5', () => {
        let r = runAfterTimes(3, () => 10);
        let ret = r()();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试6', () => {
        expect(() => runAfterTimes(3.1, () => 1)).toThrow();
        expect(() => runAfterTimes(-3.1, () => 1)).toThrow();
    });

    test('测试7', () => {
        expect(runAfterTimes(0, () => 1)()).toBe(1);
    });
});
