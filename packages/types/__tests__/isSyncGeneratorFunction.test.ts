import { isSyncGeneratorFunction } from '../src';

describe('@curong/types/isSyncGeneratorFunction', () => {
    test('测试1', () => {
        expect(isSyncGeneratorFunction(new Function())).toBe(false);

        function fn1() { }
        expect(isSyncGeneratorFunction(fn1())).toBe(false);

        async function fn2() {}
        expect(isSyncGeneratorFunction(fn2())).toBe(false);
    });

    test('测试2', () => {
        function* test1() {}
        expect(isSyncGeneratorFunction(test1())).toBe(true);

        async function* test2() { }
        expect(isSyncGeneratorFunction(test2())).toBe(false);
    });
});