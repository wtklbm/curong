import { isAsyncFunction } from '../src';

describe('@curong/types/isAsyncFunction', () => {
    test('测试1', () => {
        function fn() {}
        expect(isAsyncFunction(fn)).toBe(false);

        function* gFn() {}
        expect(isAsyncFunction(gFn)).toBe(false);
    });

    test('测试2', () => {
        async function test() {}
        expect(isAsyncFunction(test)).toBe(true);
    });
});
