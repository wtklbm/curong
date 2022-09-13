import { isSyncIterable } from '../src';

describe('@curong/types/isSyncIterable', () => {
    test('测试1', () => {
        expect(isSyncIterable(new Function())).toBe(false);
        expect(isSyncIterable(0)).toBe(false);
        expect(isSyncIterable(false)).toBe(false);
        expect(isSyncIterable(NaN)).toBe(false);
        expect(isSyncIterable(Infinity)).toBe(false);
        expect(isSyncIterable(undefined)).toBe(false);
        expect(isSyncIterable(null)).toBe(false);
        expect(isSyncIterable(Promise)).toBe(false);
        expect(isSyncIterable(Promise.resolve())).toBe(false);
        expect(isSyncIterable({})).toBe(false);
        expect(isSyncIterable({ then() {} })).toBe(false);
        expect(isSyncIterable((() => {})())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isSyncIterable(test())).toBe(true);

        expect(isSyncIterable('')).toBe(true);
        expect(isSyncIterable([])).toBe(true);
        expect(isSyncIterable(new Set())).toBe(true);
        expect(isSyncIterable(new WeakSet())).toBe(false);
        expect(isSyncIterable(new Map())).toBe(true);
        expect(isSyncIterable(new WeakMap())).toBe(false);
        expect(isSyncIterable((function* () {})())).toBe(true);
    })

    test('测试3', () => {
        const syncIter = {
            [Symbol.iterator]() {}
        };
        expect(isSyncIterable(syncIter)).toBe(true);

        const asyncIter = {
            async *[Symbol.asyncIterator]() {}
        };
        expect(isSyncIterable(asyncIter)).toBe(false);
    });
});
