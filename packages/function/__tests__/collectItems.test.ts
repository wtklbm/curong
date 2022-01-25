import { collectItems } from '../src';

describe('@curong/function/curring', () => {
    test('测试1', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems({
            total: 2
        });

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: true,
            value: [1, 2]
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
    });

    test('测试2', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems({
            total: 2,
            isRestart: true
        });

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: true,
            value: [1, 2]
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: true,
            value: [3, 4]
        });
    });

    test('测试3', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const f1 = async () => Promise.resolve(`${++total}`);

        const collectItem = collectItems({
            total: 2,
            isRestart: true,
            isAccumulate: true
        });

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });

        expect(await collectItem(f1())).toEqual({
            done: true,
            value: [1, '2']
        });

        expect(await collectItem(f1())).toEqual({
            done: false,
            value: undefined
        });

        expect(await collectItem(f())).toEqual({
            done: true,
            value: [1, '2', '3', 4]
        });
    });

    test('测试4', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems();

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });

        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [1, 2, 3]
        });
    });

    test('测试5', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems({
            isRestart: true
        });

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [1, 2, 3]
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [4, 5]
        });
    });

    test('测试6', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems({
            isAccumulate: true
        });

        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [1, 2, 3]
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: false,
            value: undefined
        });
    });

    test('测试7', async () => {
        let total = 0;
        const f = async () => Promise.resolve(++total);
        const collectItem = collectItems({
            isRestart: true,
            isAccumulate: true
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [1, 2, 3]
        });
        expect(await collectItem(f())).toEqual({
            done: false,
            value: undefined
        });
        expect(await collectItem(f(), true)).toEqual({
            done: true,
            value: [1, 2, 3, 4, 5]
        });
    });
});
