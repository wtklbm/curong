import { isGenerator } from '../src';

describe('@curong/types/isGenerator', () => {
    test('测试1', () => {
        expect(isGenerator(new Function())).toBe(false);

        function fn1() { }
        expect(isGenerator(fn1())).toBe(false);

        async function fn2() {}
        expect(isGenerator(fn2())).toBe(false);
    });

    test('测试2', () => {
        function* test1() {}
        expect(isGenerator(test1())).toBe(true);

        async function* test2() { }
        expect(isGenerator(test2())).toBe(true);
    });
});
