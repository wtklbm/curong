import { isAsyncIterable } from '../src';

describe('@curong/types/isAsyncIterable', () => {
    test('测试1', () => {
        expect(isAsyncIterable(new Function())).toBe(false);
        expect(isAsyncIterable(0)).toBe(false);
        expect(isAsyncIterable(false)).toBe(false);
        expect(isAsyncIterable(NaN)).toBe(false);
        expect(isAsyncIterable(Infinity)).toBe(false);
        expect(isAsyncIterable(undefined)).toBe(false);
        expect(isAsyncIterable(null)).toBe(false);
        expect(isAsyncIterable(Promise)).toBe(false);
        expect(isAsyncIterable(Promise.resolve())).toBe(false);
        expect(isAsyncIterable({})).toBe(false);
        expect(isAsyncIterable({ then() {} })).toBe(false);
        expect(isAsyncIterable((() => {})())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isAsyncIterable(test())).toBe(false);

        expect(isAsyncIterable('')).toBe(false);
        expect(isAsyncIterable([])).toBe(false);
        expect(isAsyncIterable(new Set())).toBe(false);
        expect(isAsyncIterable(new WeakSet())).toBe(false);
        expect(isAsyncIterable(new Map())).toBe(false);
        expect(isAsyncIterable(new WeakMap())).toBe(false);
        expect(isAsyncIterable((function* () {})())).toBe(false);
    });

    test('测试3', () => {
        const syncIter = {
            [Symbol.iterator]() {}
        };
        expect(isAsyncIterable(syncIter)).toBe(false);

        const asyncIter = {
            async *[Symbol.asyncIterator]() {}
        };
        expect(isAsyncIterable(asyncIter)).toBe(true);
    });
});
