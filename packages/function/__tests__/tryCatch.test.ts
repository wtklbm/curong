import { tryCatch } from '../src';

describe('@curong/function/tryCatch', () => {
    test('测试1', async () => {
        let ret = await tryCatch(() => 1);
        expect(ret).toBe(1);

        ret = await tryCatch(async () => Promise.resolve(10));
        expect(ret).toBe(10);
    });

    test('测试2', () => {
        tryCatch(() => {
            throw new Error('报错了');
        }).catch(e => {
            expect(e.message).toBe('报错了');
        });

        tryCatch(async () => {
            return Promise.resolve(Promise.reject('报错了'));
        }).catch(e => {
            expect(e).toBe('报错了');
        });
    });
});
