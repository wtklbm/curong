import { ifThrow } from '..';

describe('@curong/function/ifThrow', () => {
    test('测试1', async () => {
        // @ts-ignore
        expect(await ifThrow(1)).toBe(1);

        async function fetchData() {
            return Promise.resolve(1);
        }
        const result = await ifThrow(fetchData, 'defaultData');
        expect(result).toBe(1);
    });

    test('测试2', async () => {
        async function fetchData() {
            throw new Error('xxx');
        }
        const result = await ifThrow(fetchData, 'defaultData');
        expect(result).toBe('defaultData');
    });

    test('测试3', async () => {
        function getData() {
            return 'syncData';
        }
        const result = await ifThrow(getData, 'defaultData');
        expect(result).toBe('syncData');
    });

    test('测试4', async () => {
        async function fetchData() {
            return Promise.resolve(1);
        }
        const result = await ifThrow(fetchData, () => 'defaultData');
        expect(result).toBe(1);
    });

    test('测试5', async () => {
        async function fetchData() {
            throw new Error('xxx');
        }
        const result = await ifThrow(fetchData, () => 'defaultData');
        expect(result).toBe('defaultData');
    });

    test('测试6', async () => {
        function getData() {
            return 'syncData';
        }
        const result = await ifThrow(getData, () => 'defaultData');
        expect(result).toBe('syncData');
    });

    test('测试7', async () => {
        async function fetchData(value: number) {
            if (value === 1) {
                throw new Error('Network error');
            }
            return value;
        }
        const result = await ifThrow(
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
        const result = ifThrow(
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
        const result = await ifThrow(
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
        const result = await ifThrow(
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

        const result = ifThrow(
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
        expect(await ifThrow(Promise.resolve(1))).toBe(1);
        expect(await ifThrow(() => Promise.resolve(1))).toBe(1);
    });

    test('测试14', async () => {
        expect(await ifThrow(Promise.reject('1'), 1)).toBe(1);
        expect(await ifThrow(Promise.reject('1'), Promise.resolve(1))).toBe(1);
        expect(
            await ifThrow(Promise.reject('1'), () => Promise.resolve(1))
        ).toBe(1);
        expect(
            await ifThrow(() => Promise.reject('1'), Promise.resolve(1))
        ).toBe(1);
        expect(
            await ifThrow(
                () => Promise.reject('1'),
                () => Promise.resolve(1)
            )
        ).toBe(1);
    });

    test('测试15', async () => {
        expect(await ifThrow(Promise.reject('1'), 1)).toBe(1);
        expect(ifThrow(Promise.reject('1'), Promise.reject(1))).rejects.toBe(1);
        expect(
            ifThrow(Promise.reject('1'), () => Promise.reject(1))
        ).rejects.toBe(1);
        expect(
            ifThrow(() => Promise.reject('1'), Promise.reject(1))
        ).rejects.toBe(1);
        expect(
            ifThrow(
                () => Promise.reject('1'),
                () => Promise.reject(1)
            )
        ).rejects.toBe(1);
    });

    test('测试16', async () => {
        expect(await ifThrow(Promise.reject('1'))).toBe(undefined);
        expect(await ifThrow(Promise.reject('1'))).toBe(undefined);
        expect(await ifThrow(Promise.resolve('1'))).toBe('1');
        expect(await ifThrow(() => Promise.resolve('1'))).toBe('1');
        expect(await ifThrow(() => 1)).toBe(1);
        expect(
            await ifThrow(() => {
                throw 1;
            })
        ).toBe(undefined);
        expect(
            await ifThrow(
                () => {
                    throw 1;
                },
                e => e
            )
        ).toBe(1);

        expect(
            ifThrow(
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
