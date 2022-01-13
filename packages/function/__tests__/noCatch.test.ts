import { noCatch } from '../src';

describe('@curong/function/noCatch', () => {
    test('测试1', async () => {
        let ret = await noCatch(() => 1);
        expect(ret).toBe(1);

        ret = await noCatch(async () => Promise.resolve(10));
        expect(ret).toBe(10);
    });

    test('测试2', async () => {
        let ret = await noCatch(() => {
            throw new Error('报错了');
        });

        expect(ret).toBe(undefined);

        ret = await noCatch(async () => {
            return Promise.resolve(Promise.reject('报错了'));
        });

        expect(ret).toBe(undefined);
    });

    test('测试3', async () => {
        const fn1 = () => new Promise(r => setTimeout(() => r('完成了'), 1e3));
        const fn2 = () =>
            new Promise((_, r) => setTimeout(() => r('出错了'), 1e3));

        expect(await noCatch(fn1)).toBe('完成了');
        expect(await noCatch(fn2)).toBe(undefined);
    });

    test('测试4', async () => {
        expect(await noCatch({ name: 'xxx' })).toEqual({ name: 'xxx' });
        expect(await noCatch([0, 1])).toEqual([0, 1]);
        expect(await noCatch(null)).toBe(null);
        expect(await noCatch(undefined)).toBe(undefined);
        expect(await noCatch(0)).toBe(0);
        expect(await noCatch(NaN)).toBe(NaN);
        expect(await noCatch('x')).toBe('x');

        const c = {};

        // @ts-ignore
        expect(await noCatch(() => c.xx.xx.xx)).toBe(undefined);
    });

    test('测试5', async () => {
        function* gen1() {
            return 'succeed';
        }

        function* gen2() {
            yield 1;
            return 'succeed';
        }

        const gen3 = gen2();

        expect(await noCatch(gen1)).toBe('succeed');
        expect(await noCatch(gen2)).toBe(1);
        expect(await noCatch(gen3)).toBe(1);
    });
});
