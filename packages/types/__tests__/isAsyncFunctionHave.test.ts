import { isAsyncFunctionHave } from '../src';

describe('@curong/types/isAsyncFunctionHave', () => {
    test('测试1', () => {
        function fn() {}
        expect(isAsyncFunctionHave(fn)).toBe(false);

        function* gFn() {}
        expect(isAsyncFunctionHave(gFn)).toBe(false);

        async function test() {}
        expect(isAsyncFunctionHave(test)).toBe(false);
    });

    test('测试2', () => {
        async function test(a: any) {}
        expect(isAsyncFunctionHave(test)).toBe(true);
    });
});
