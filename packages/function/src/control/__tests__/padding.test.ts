import { padding } from '..';

describe('@curong/function/padding', () => {
    test('测试1', async () => {
        let [error, data] = await padding(() => 1);

        expect(data).toBe(1);
        expect(error).toBeNull();
    });

    test('测试2', async () => {
        let [error, data] = await padding(() => {
            throw new Error('xxx');
        });

        expect(data).toBeNull();
        expect(error).toBeTruthy();
    });

    test('测试3', async () => {
        let [error, data] = await padding(Promise.resolve(1));

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试4', async () => {
        let [error, data] = await padding(async () => 1);

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试5', async () => {
        let [error, data] = await padding(() => Promise.resolve(1));

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试6', async () => {
        let [error, data] = await padding(Promise.reject(1));

        expect(data).toBe(null);
        expect(error).toBe(1);
    });

    test('测试7', async () => {
        let [error, data] = await padding(() => Promise.reject(1));

        expect(data).toBe(null);
        expect(error).toBe(1);
    });
});
