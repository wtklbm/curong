import { deferred } from '..';

describe('@curong/function/deferred', () => {
    test('测试1', async () => {
        expect(() => {
            deferred(NaN, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            deferred(-1, (message: string) => message, 'Hello');
        }).toThrow();

        expect(() => {
            deferred(1, async (message: string) => message, 'Hello');
        }).toThrow();
    });

    test('测试2', () => {
        let r = deferred(3, () => 10);
        let ret = r();
        ret = r();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试3', () => {
        let r = deferred(3, () => 10);

        expect(r()()()).toBe(10);
    });

    test('测试4', () => {
        let r = deferred(3, () => 10);
        let ret = r();
        ret = r()();

        expect(ret).toBe(10);
    });

    test('测试5', () => {
        let r = deferred(3, () => 10);
        let ret = r()();
        ret = r();

        expect(ret).toBe(10);
    });

    test('测试6', () => {
        expect(() => deferred(3.1, () => 1)).toThrow();
        expect(() => deferred(-3.1, () => 1)).toThrow();
    });

    test('测试7', () => {
        expect(deferred(0, () => 1)()).toBe(1);
    });
});
