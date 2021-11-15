import { isIterable } from '../src';

describe('@curong/types/isIterable', () => {
    test('测试1', () => {
        expect(isIterable(new Function())).toBe(false);
        expect(isIterable(0)).toBe(false);
        expect(isIterable(false)).toBe(false);
        expect(isIterable(undefined)).toBe(false);
        expect(isIterable(null)).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isIterable(test())).toBe(true);
        expect(isIterable('')).toBe(true);
        expect(isIterable([])).toBe(true);
        expect(isIterable('')).toBe(true);
        expect(isIterable({})).toBe(false);
        expect(isIterable(new Set())).toBe(true);
        expect(isIterable(new WeakSet())).toBe(false);
        expect(isIterable(new Map())).toBe(true);
        expect(isIterable(new WeakMap())).toBe(false);
    });
});
