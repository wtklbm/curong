import { asyncLimit } from '..';
import { delay } from '../../delay';

describe('@curong/function/asyncLimit', () => {
    test('测试1', async () => {
        let x = 0;
        const add = (a: number, b: number) => {
            const r = a + b;
            x += r;
            return r;
        };

        const n = asyncLimit(add);

        expect(await Promise.all([n(1, 2), n(2, 2), n(3, 2), n(4, 2)])).toEqual(
            [3, 4, 5, 6]
        );

        expect(x).toBe(18);
    });

    test('测试2', async () => {
        const getId = async (id: number) => {
            if (id === 10) {
                throw new Error('错误');
            }
            return id;
        };

        const getIdLimit = asyncLimit(getId, { concurrency: Infinity });

        expect(await getIdLimit(1)).toBe(1);
        expect(await getIdLimit(2)).toBe(2);

        expect(
            await Promise.all([
                getIdLimit(2),
                getIdLimit(2),
                getIdLimit(3),
                getIdLimit(3)
            ])
        ).toEqual([2, 2, 3, 3]);
    });

    test('测试3', async () => {
        const getId = async (id: number) => {
            await delay(100);
            return id;
        };
        const getIdLimit = asyncLimit(getId, { concurrency: 1 });
        let x = 0;
        let y = 0;
        let z = 0;
        const promise = Promise.all([
            getIdLimit(1).then(() => (x = 1)),
            getIdLimit(2).then(() => (y = 2)),
            getIdLimit(3).then(() => (z = 3))
        ]);
        expect(x).toBe(0);
        expect(y).toBe(0);
        expect(z).toBe(0);

        await delay(150);
        expect(x).toBe(1);
        expect(y).toBe(0);
        expect(z).toBe(0);

        await delay(150);
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(0);

        await promise;

        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
    });

    test('测试4', async () => {
        const getId = async (id: number) => {
            await delay(100);
            return id;
        };
        const getIdLimit = asyncLimit(getId, { concurrency: 2 });
        let x = 0;
        let y = 0;
        let z = 0;
        let id4 = 0;
        const promise = Promise.all([
            getIdLimit(1).then(() => (x = 1)),
            getIdLimit(2).then(() => (y = 2)),
            getIdLimit(3).then(() => (z = 3))
        ]);
        expect(x).toBe(0);
        expect(y).toBe(0);
        expect(z).toBe(0);

        delay(100).then(() => {
            getIdLimit(4).then(() => (id4 = 4));
        });

        await delay(150);
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(0);
        expect(id4).toBe(0);

        await delay(150);
        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
        expect(id4).toBe(4);

        await promise;

        expect(x).toBe(1);
        expect(y).toBe(2);
        expect(z).toBe(3);
        expect(id4).toBe(4);
    });
});
