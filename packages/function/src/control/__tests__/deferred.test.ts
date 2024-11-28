import { deferred } from '..';

describe('@curong/function/deferred', () => {
    test('测试1', () => {
        const p1 = deferred<number>();
        p1.resolve(42);
        p1.promise.then(value => {
            expect(value).toBe(42);
        });
    });

    test('测试2', () => {
        const p2 = deferred<string>();
        p2.reject(new Error('报错了'));
        p2.promise.catch(error => {
            expect(error.message).toBe('报错了');
        });
    });

    test('测试3', async () => {
        const { promise, resolve } = deferred();
        resolve();
        expect(await promise).toBeUndefined();
    });

    test('测试4', async () => {
        const { promise, resolve } = deferred<number>();
        resolve(10);
        expect(await promise).toBe(10);
    });

    test('测试5', async () => {
        const { promise, reject } = deferred();
        const mockError = new Error('test error');
        reject(mockError);
        await expect(promise).rejects.toThrow('test error');
    });

    test('测试6', async () => {
        const { promise, reject, resolve } = deferred();
        resolve();
        await promise;
        expect(() => reject(new Error('test error'))).not.toThrow();
        expect(() => resolve()).not.toThrow();
    });
});
