import { isGeneratorFunction } from '../src';

describe('@curong/types/isGeneratorFunction', () => {
    test('测试1', () => {
        expect(isGeneratorFunction(new Function())).toBe(false);

        function fn1() {}
        expect(isGeneratorFunction(fn1())).toBe(false);

        async function fn2() {}
        expect(isGeneratorFunction(fn2())).toBe(false);
    });

    test('测试2', () => {
        function* test1() {}
        expect(isGeneratorFunction(test1)).toBe(true);
        expect(isGeneratorFunction(test1())).toBe(false);

        async function* test2() {}
        expect(isGeneratorFunction(test2)).toBe(true);
        expect(isGeneratorFunction(test2())).toBe(false);
    });
});
