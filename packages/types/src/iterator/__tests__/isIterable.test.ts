import { isIterable } from '..';

describe('@curong/types/isIterable', () => {
    test('测试1', () => {
        expect(isIterable(new Function())).toBe(false);
        expect(isIterable(0)).toBe(false);
        expect(isIterable(false)).toBe(false);
        expect(isIterable(NaN)).toBe(false);
        expect(isIterable(Infinity)).toBe(false);
        expect(isIterable(undefined)).toBe(false);
        expect(isIterable(null)).toBe(false);
        expect(isIterable(Promise)).toBe(false);
        expect(isIterable(Promise.resolve())).toBe(false);
        expect(isIterable({})).toBe(false);
        expect(isIterable({ then() {} })).toBe(false);
        expect(isIterable((() => {})())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isIterable(test())).toBe(true);

        expect(isIterable('')).toBe(true);
        expect(isIterable([])).toBe(true);
        expect(isIterable(new Set())).toBe(true);
        expect(isIterable(new WeakSet())).toBe(false);
        expect(isIterable(new Map())).toBe(true);
        expect(isIterable(new WeakMap())).toBe(false);
        expect(isIterable((function* () {})())).toBe(true);
    });

    test('测试3', () => {
        const syncIter = {
            [Symbol.iterator]() {}
        };
        expect(isIterable(syncIter)).toBe(true);

        const asyncIter = {
            async *[Symbol.asyncIterator]() {}
        };
        expect(isIterable(asyncIter)).toBe(true);
    });
});
