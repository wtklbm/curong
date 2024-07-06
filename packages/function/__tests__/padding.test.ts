import { padding } from '../src';

describe('@curong/function/padding', () => {
    test('测试1', async () => {
        let [data, error] = await padding(() => 1);

        expect(data).toBe(1);
        expect(error).toBeNull();
    });

    test('测试2', async () => {
        let [data, error] = await padding(() => {
            throw new Error('xxx');
        });

        expect(data).toBeNull();
        expect(error).toBeTruthy();
    });

    test('测试3', async () => {
        let [data, error] = await padding(Promise.resolve(1));

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试4', async () => {
        let [data, error] = await padding(async () => 1);

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试5', async () => {
        let [data, error] = await padding(() => Promise.resolve(1));

        expect(data).toBe(1);
        expect(error).toBe(null);
    });

    test('测试6', async () => {
        let [data, error] = await padding(Promise.reject(1));

        expect(data).toBe(null);
        expect(error).toBe(1);
    });

    test('测试7', async () => {
        let [data, error] = await padding(() => Promise.reject(1));

        expect(data).toBe(null);
        expect(error).toBe(1);
    });
});
