import { parallel } from '../src';

describe('@curong/function/parallel', () => {
    const get = () => {
        const s: any = [];
        let i = 0;

        const task = () =>
            new Promise<number>(resolve =>
                setTimeout(() => {
                    ++i;
                    s.push(i);
                    resolve(i);
                }, 100)
            );
        return { s, i, task };
    };

    test('测试1', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel([task, 12312]);
        expect(pool).toEqual([1, 12312]);
        expect(s).toEqual([1]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试2', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel([task, task, 12312]);
        expect(pool).toEqual([1, 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试3', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel([task, task, 12312], { concurrency: 2 });
        expect(pool).toEqual([1, 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试4', async () => {
        const { task, s } = get();
        const date = Date.now();
        expect(
            parallel(
                [
                    task,
                    () => {
                        throw new Error('xxx');
                    },
                    task,
                    12312
                ],
                {
                    concurrency: 2,
                    onProgress(index, result) {}
                }
            )
        ).rejects.toThrow();
        expect(s).toEqual([]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(0);
    });

    test('测试5', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                () => {
                    return 'xxx';
                },
                task,
                12312
            ],
            { concurrency: 2 }
        );
        expect(pool).toEqual([1, 'xxx', 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试6', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                () => {
                    throw new Error('xxx');
                },
                task,
                12312
            ],
            {
                concurrency: 2,
                onError: e => 'xxx'
            }
        );
        expect(pool).toEqual([1, 'xxx', 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试7', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                () => {
                    throw new Error('xxx');
                },
                task,
                12312
            ],
            {
                concurrency: 2,
                maxRetry: 3,
                onError: e => 'xxx'
            }
        );
        expect(pool).toEqual([1, 'xxx', 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(1);
    });

    test('测试8', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                () => {
                    throw new Error('xxx');
                },
                task,
                12312
            ],
            {
                concurrency: 2,
                maxRetry: 3,
                retryWait: 100,
                onError: e => 'xxx'
            }
        );
        expect(pool).toEqual([1, 'xxx', 2, 12312]);
        expect(s).toEqual([1, 2]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(3);
    });

    test('测试9', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                task,
                task,
                () => {
                    throw new Error('xxx');
                },
                12312,
                task
            ],
            {
                concurrency: 2,
                onError: e => 'xxx',
                maxRetry: 3,
                retryWait: 100
            }
        );

        expect(pool).toEqual([1, 2, 3, 'xxx', 12312, 4]);
        expect(s).toEqual([1, 2, 3, 4]);
        expect(Math.floor((Date.now() - date) / 100)).toBe(4);
    });

    test('测试10', async () => {
        const arr = [1, 2, 3, 4];
        const mapper = (v: number) => Promise.resolve(v);
        const pool = await parallel(arr.map(mapper), {
            concurrency: arr.length
        });
        expect(pool).toEqual([1, 2, 3, 4]);
    });

    test('测试11', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                task,
                task,
                () => {
                    throw new Error('xxx');
                },
                12312,
                task
            ],
            {
                concurrency: 2,
                onError: e => 'xxx',
                maxRetry: 3,
                retryWait: { start: 0, end: 100 }
            }
        );

        expect(pool).toEqual([1, 2, 3, 'xxx', 12312, 4]);
        expect(s).toEqual([1, 2, 3, 4]);

        const time = Math.floor((Date.now() - date) / 100);
        expect(time > 0 && time < 5).toBe(true);
    });

    test('测试12', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                task,
                task,
                () => {
                    throw new Error('xxx');
                },
                12312,
                task
            ],
            {
                concurrency: 2,
                maxRetry: 3,
                retryWait: { start: 0, end: 100 },
                onProgressRetry(index, error, attempts) {
                    if (error.message.includes('xxx')) {
                        return true;
                    }
                }
            }
        );

        expect(pool).toEqual([1, 2, 3, undefined, 12312, 4]);
        expect(s).toEqual([1, 2, 3, 4]);

        const time = Math.floor((Date.now() - date) / 100);
        expect(time > 0 && time < 5).toBe(true);
    });

    test('测试13', async () => {
        const { task, s } = get();
        const date = Date.now();
        const pool = await parallel(
            [
                task,
                task,
                task,
                () => {
                    throw new Error('xxx');
                },
                12312,
                task
            ],
            {
                concurrency: 2,
                maxRetry: 3,
                retryWait: { start: 0, end: 100 },
                onError: e => 'xxx',
                onProgressRetry(index, error, attempts) {
                    if (error.message.includes('xxx')) {
                        return true;
                    }
                }
            }
        );

        expect(pool).toEqual([1, 2, 3, 'xxx', 12312, 4]);
        expect(s).toEqual([1, 2, 3, 4]);

        const time = Math.floor((Date.now() - date) / 100);
        expect(time > 0 && time < 5).toBe(true);
    });
});
