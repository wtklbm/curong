import { timeoutOr } from '../src';

describe('@curong/function/timeoutOr', () => {
    test('测试1', async () => {
        const fn = (a: number, b: number) => {
            // 同步代码阻塞在这里了，所以代码会执行 300ms 而不会返回错误
            for (const start = Date.now(); Date.now() - start < 300; ) {}
            return a + b;
        };

        const ret = await timeoutOr(
            100,
            fn,
            () => {
                throw new EvalError(`[timeoutThrow]: 该方法执行的时间已超时`);
            },
            1,
            2
        );
        expect(ret).toBe(3);
    });

    test('测试2', async () => {
        const fn = (a: number, b: number) => {
            return new Promise(resolve =>
                setTimeout(() => resolve(a + b), 300)
            );
        };

        await timeoutOr(
            100,
            fn,
            () => {
                throw new EvalError(`[timeoutThrow]: 该方法执行的时间已超时`);
            },
            1,
            2
        ).catch(e => {
            expect(e).toBeTruthy();
        });
    });

    test('测试3', async () => {
        const ret = await timeoutOr(100, Promise.resolve(3), () => {
            throw new EvalError(`[timeoutThrow]: 该方法执行的时间已超时`);
        });
        expect(ret).toBe(3);
    });

    test('测试4', async () => {
        await timeoutOr(100, Promise.reject(3), () => {
            throw new EvalError(`[timeoutThrow]: 该方法执行的时间已超时`);
        }).catch(e => expect(e).toBe(3));
    });

    test('测试5', async () => {
        const ret = await timeoutOr(100, Promise.resolve(3), () =>
            Promise.reject(0)
        );
        expect(ret).toBe(3);
    });

    test('测试6', async () => {
        const ret = await timeoutOr(
            100,
            () => Promise.resolve(3),
            () => Promise.reject(0)
        );
        expect(ret).toBe(3);
    });

    test('测试7', async () => {
        const ret = await timeoutOr(
            100,
            async () => Promise.resolve(3),
            async () => Promise.reject(0)
        );
        expect(ret).toBe(3);
    });

    test('测试8', async () => {
        const ret = await timeoutOr(100, Promise.resolve(3), 0);
        expect(ret).toBe(3);
    });

    test('测试9', async () => {
        const ret = await timeoutOr(100, async () => Promise.resolve(3), 0);
        expect(ret).toBe(3);
    });

    test('测试10', async () => {
        const ret = await timeoutOr(100, async () => Promise.resolve(3), 0);
        expect(ret).toBe(3);
    });

    test('测试11', async () => {
        const ret = await timeoutOr(100, async () => Promise.resolve(3), null);
        expect(ret).toBe(3);
    });

    test('测试12', async () => {
        const ret = await timeoutOr(
            100,
            async () => Promise.resolve(3),
            undefined
        );
        expect(ret).toBe(3);
    });

    test('测试13', async () => {
        const ret = await timeoutOr(100, async () => Promise.resolve(3));
        expect(ret).toBe(3);
    });

    test('测试14', async () => {
        const fn = (a: number, b: number) => {
            // 同步代码阻塞在这里了，所以代码会执行 300ms 而不会返回错误
            for (const start = Date.now(); Date.now() - start < 300; ) {}
            return a + b;
        };
        const ret = await timeoutOr(100, fn, 0, 1, 2);
        expect(ret).toBe(3);
    });

    test('测试15', async () => {
        const fn = (a: number, b: number) => {
            return new Promise(resolve =>
                setTimeout(() => resolve(a + b), 300)
            );
        };
        const ret = await timeoutOr(100, fn, 0, 1, 2);
        expect(ret).toBe(0);
    });

    test('测试16', async () => {
        expect(await timeoutOr(100, Promise.resolve(1))).toBe(1);
        expect(await timeoutOr(100, Promise.resolve(null))).toBe(null);
        expect(timeoutOr(100, Promise.reject(1))).rejects.toBe(1);
        await timeoutOr(100, Promise.reject(1)).catch(e => expect(e).toBe(1));

        expect(await timeoutOr(100, () => Promise.resolve(1))).toBe(1);
        expect(await timeoutOr(100, () => Promise.resolve(null))).toBe(null);
        expect(timeoutOr(100, () => Promise.reject(1))).rejects.toBe(1);
        await timeoutOr(100, () => Promise.reject(1)).catch(e =>
            expect(e).toBe(1)
        );
    });
});
