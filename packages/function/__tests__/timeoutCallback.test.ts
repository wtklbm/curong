import { timeoutCallback } from '../src';

describe('@curong/function/timeoutCallback', () => {
    test('测试1', async () => {
        const fn = (a: number, b: string) => a + +b * 2;
        let ret = await timeoutCallback(122, () => fn(1, '2'), 0);
        expect(ret).toBe(5);

        ret = await timeoutCallback(122, () => fn(1, '2'), 0, true);
        expect(ret).toBe(5);

        ret = await timeoutCallback(122, async () => fn(1, '2'), 0);
        expect(ret).toBe(5);

        ret = await timeoutCallback(122, async () => fn(1, '2'), 0, true);
        expect(ret).toBe(5);

        ret = await timeoutCallback(
            122,
            async () => {
                if (1.1 + 1.0 > 2) {
                    throw 0;
                }

                return 0;
            },
            0,
            true
        ).catch(() => 0);
        expect(ret).toBe(0);

        ret = await timeoutCallback(
            122,
            () => fn(1, '2'),
            () => 0
        );

        expect(ret).toBe(5);

        ret = await timeoutCallback(
            122,
            () => fn(1, '2'),
            () => 0,
            true
        );

        expect(ret).toBe(5);
    });

    test('测试2', async () => {
        const fn = (a: number, b: string, bool: boolean) =>
            new Promise(resolve => {
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    resolve(a + +b * 2 - +bool);
                }, 999);
            });

        let ret = await timeoutCallback(1e3, fn(1, '2', false), 0);
        expect(ret).toBe(5);

        ret = await timeoutCallback(1, fn(1, '2', false), 0);
        expect(ret).toBe(0);

        ret = await timeoutCallback(1, fn(1, '2', false), 0, true).catch(e => {
            expect(e).toBe(0);
        });

        ret = await timeoutCallback(1e3, async () => fn(1, '2', false), 0);
        expect(ret).toBe(5);

        ret = await timeoutCallback(1, async () => fn(1, '2', false), 0);
        expect(ret).toBe(0);
    });
});
