import { timeoutThrow } from '../src';

describe('@curong/function/timeoutThrow', () => {
    test('测试1', async () => {
        const fn = (a: number, b: string) => a + +b * 2;
        const ret = await timeoutThrow(122, fn, 1, '2');

        expect(ret).toBe(5);
    });

    test('测试2', async () => {
        const fn = (a: number, b: string, bool: boolean) =>
            new Promise(resolve => {
                let timer: any = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                    resolve(a + +b * 2 - +bool);
                }, 999);
            });

        const ret = await timeoutThrow(1e3, fn, 1, '2', false);
        expect(ret).toBe(5);

        await timeoutThrow(123, fn, 1, '2', true).catch(e =>
            expect(e).toBeTruthy()
        );
    });
});
