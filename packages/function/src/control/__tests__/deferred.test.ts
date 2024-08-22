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
});
