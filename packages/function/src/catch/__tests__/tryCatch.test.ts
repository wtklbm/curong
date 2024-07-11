import { tryCatch } from '..';

describe('@curong/function/tryCatch', () => {
    test('测试1', async () => {
        let ret = await tryCatch(() => 1);
        expect(ret).toBe(1);

        ret = await tryCatch(async () => Promise.resolve(10));
        expect(ret).toBe(10);
    });

    test('测试2', async () => {
        await tryCatch(() => {
            throw new Error('报错了');
        }).catch(e => {
            expect(e.message).toBe('报错了');
        });

        await tryCatch(async () => {
            return Promise.resolve(Promise.reject('报错了'));
        }).catch(e => {
            expect(e).toBe('报错了');
        });
    });

    test('测试3', async () => {
        let ret = await tryCatch(() => 1);
        expect(ret).toBe(1);

        ret = await tryCatch(async () => Promise.resolve(10));
        expect(ret).toBe(10);
    });

    test('测试5', async () => {
        const fn1 = () => new Promise(r => setTimeout(() => r('完成了'), 1e3));
        const fn2 = () =>
            new Promise((_, r) => setTimeout(() => r('出错了'), 1e3));

        expect(await tryCatch(fn1)).toBe('完成了');
        await tryCatch(fn2).catch(e => {
            expect(e).toBe('出错了');
        });
    });

    test('测试6', async () => {
        const c = {};

        // @ts-ignore
        await tryCatch(() => c.xx.xx.xx).catch(e => {
            expect(e.message).toBe(
                `Cannot read properties of undefined (reading 'xx')`
            );
        });
    });
});
