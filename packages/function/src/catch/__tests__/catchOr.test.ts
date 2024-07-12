import { catchOr } from '..';

describe('@curong/function/catchOr', () => {
    test('测试1', async () => {
        // @ts-ignore
        expect(await catchOr(1)).toBe(1);

        async function fetchData() {
            return Promise.resolve(1);
        }
        const result = await catchOr(fetchData, 'defaultData');
        expect(result).toBe(1);
    });

    test('测试2', async () => {
        async function fetchData() {
            throw new Error('xxx');
        }
        const result = await catchOr(fetchData, 'defaultData');
        expect(result).toBe('defaultData');
    });

    test('测试3', async () => {
        function getData() {
            return 'syncData';
        }
        const result = await catchOr(getData, 'defaultData');
        expect(result).toBe('syncData');
    });

    test('测试4', async () => {
        async function fetchData() {
            return Promise.resolve(1);
        }
        const result = await catchOr(fetchData, () => 'defaultData');
        expect(result).toBe(1);
    });

    test('测试5', async () => {
        async function fetchData() {
            throw new Error('xxx');
        }
        const result = await catchOr(fetchData, () => 'defaultData');
        expect(result).toBe('defaultData');
    });

    test('测试6', async () => {
        function getData() {
            return 'syncData';
        }
        const result = await catchOr(getData, () => 'defaultData');
        expect(result).toBe('syncData');
    });

    test('测试7', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                throw new Error('Network error');
            }
            return value;
        }
        const result = await catchOr(
            fetchData,
            (value: number) => 'defaultData',
            1
        );
        expect(result).toBe('defaultData');
    });

    test('测试8', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                throw new Error('Network error');
            }
            return value;
        }
        const result = catchOr(
            fetchData,
            (error, value: number) => {
                expect(value).toBe(1);
                throw new Error('不能为 1');
            },
            1
        );
        expect(result).rejects.toThrow();
    });

    test('测试9', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                return '成功';
            }
            return value;
        }
        const result = await catchOr(
            fetchData,
            (error, value: number) => {
                if (error.message.includes('失败')) {
                    return '失败后成功';
                }

                return '失败';
            },
            1
        );
        expect(result).toBe('成功');
    });

    test('测试10', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                throw new Error('失败');
            }
            return value;
        }
        const result = await catchOr(
            fetchData,
            (error, value: number) => {
                if (error.message.includes('失败')) {
                    return '失败后成功';
                }

                return '失败';
            },
            1
        );
        expect(result).toBe('失败后成功');
    });

    test('测试12', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                throw new Error('失败');
            }
            return value;
        }

        const result = catchOr(
            fetchData,
            (error, value: number) => {
                if (error.message.includes('失败')) {
                    throw '失败后成功';
                }

                return '失败';
            },
            1
        );
        expect(result).rejects.toBe('失败后成功');
    });

    test('测试13', async () => {
        expect(await catchOr(Promise.resolve(1))).toBe(1);
        expect(await catchOr(() => Promise.resolve(1))).toBe(1);
    });

    test('测试14', async () => {
        expect(await catchOr(Promise.reject('1'), 1)).toBe(1);
        expect(await catchOr(Promise.reject('1'), Promise.resolve(1))).toBe(1);
        expect(
            await catchOr(Promise.reject('1'), () => Promise.resolve(1))
        ).toBe(1);
        expect(
            await catchOr(() => Promise.reject('1'), Promise.resolve(1))
        ).toBe(1);
        expect(
            await catchOr(
                () => Promise.reject('1'),
                () => Promise.resolve(1)
            )
        ).toBe(1);
    });

    test('测试15', async () => {
        expect(await catchOr(Promise.reject('1'), 1)).toBe(1);
        expect(catchOr(Promise.reject('1'), Promise.reject(1))).rejects.toBe(1);
        expect(
            catchOr(Promise.reject('1'), () => Promise.reject(1))
        ).rejects.toBe(1);
        expect(
            catchOr(() => Promise.reject('1'), Promise.reject(1))
        ).rejects.toBe(1);
        expect(
            catchOr(
                () => Promise.reject('1'),
                () => Promise.reject(1)
            )
        ).rejects.toBe(1);
    });

    test('测试16', async () => {
        expect(await catchOr(Promise.reject('1'))).toBe(undefined);
        expect(await catchOr(Promise.reject('1'))).toBe(undefined);
        expect(await catchOr(Promise.resolve('1'))).toBe('1');
        expect(await catchOr(() => Promise.resolve('1'))).toBe('1');
        expect(await catchOr(() => 1)).toBe(1);
        expect(
            await catchOr(() => {
                throw 1;
            })
        ).toBe(undefined);
        expect(
            await catchOr(
                () => {
                    throw 1;
                },
                e => e
            )
        ).toBe(1);

        expect(
            catchOr(
                () => {
                    throw 1;
                },
                e => {
                    throw e;
                }
            )
        ).rejects.toBe(1);
    });
});
