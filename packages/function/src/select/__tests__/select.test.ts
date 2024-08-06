import select from '../select';

describe('@curong/function/select', () => {
    test('测试1', async () => {
        expect(await select(true, 1, 2)).toBe(1);
        expect(await select(Promise.resolve(true), 1, 2)).toBe(1);
        expect(await select(true, 1, Promise.resolve(2))).toBe(1);
        expect(await select(Promise.resolve(true), 1, Promise.resolve(2))).toBe(
            1
        );
        expect(await select(true, Promise.resolve(1), 2)).toBe(1);
        expect(await select(true, Promise.resolve(1), Promise.resolve(2))).toBe(
            1
        );
        expect(
            await select(
                Promise.resolve(true),
                Promise.resolve(1),
                Promise.resolve(2)
            )
        ).toBe(1);
    });

    test('测试2', async () => {
        expect(await select(() => true, 1, 2)).toBe(1);
        expect(await select(() => Promise.resolve(true), 1, 2)).toBe(1);
        expect(await select(() => true, 1, Promise.resolve(2))).toBe(1);
        expect(
            await select(() => Promise.resolve(true), 1, Promise.resolve(2))
        ).toBe(1);
        expect(await select(() => true, Promise.resolve(1), 2)).toBe(1);
        expect(
            await select(() => true, Promise.resolve(1), Promise.resolve(2))
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                Promise.resolve(1),
                Promise.resolve(2)
            )
        ).toBe(1);
    });

    test('测试3', async () => {
        expect(
            await select(
                () => true,
                () => 1,
                2
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => 1,
                2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                1,
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => 1,
                Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                () => Promise.resolve(1),
                2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                () => Promise.resolve(1),
                Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => Promise.resolve(1),
                Promise.resolve(2)
            )
        ).toBe(1);
    });

    test('测试4', async () => {
        expect(
            await select(
                () => true,
                1,
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                1,
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                1,
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                1,
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                Promise.resolve(1),
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                Promise.resolve(1),
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                Promise.resolve(1),
                () => Promise.resolve(2)
            )
        ).toBe(1);
    });

    test('测试5', async () => {
        expect(
            await select(
                () => true,
                () => 1,
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => 1,
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                () => 1,
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => 1,
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                () => Promise.resolve(1),
                () => 2
            )
        ).toBe(1);
        expect(
            await select(
                () => true,
                () => Promise.resolve(1),
                () => Promise.resolve(2)
            )
        ).toBe(1);
        expect(
            await select(
                () => Promise.resolve(true),
                () => Promise.resolve(1),
                () => Promise.resolve(2)
            )
        ).toBe(1);
    });
});
