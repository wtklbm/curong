import { isSyncGenerator } from '..';

describe('@curong/types/isSyncGenerator', () => {
    test('测试1', () => {
        expect(isSyncGenerator(new Function())).toBe(false);

        function fn1() {}
        expect(isSyncGenerator(fn1())).toBe(false);

        async function fn2() {}
        expect(isSyncGenerator(fn2())).toBe(false);
    });

    test('测试2', () => {
        function* test1() {}
        expect(isSyncGenerator(test1())).toBe(true);

        async function* test2() {}
        expect(isSyncGenerator(test2())).toBe(false);
    });
});
