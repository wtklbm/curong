import { isPrototype } from '..';

describe('@curong/types/isPrototype', () => {
    test('测试1', () => {
        expect(isPrototype(null)).toBe(false);
        expect(isPrototype(undefined)).toBe(false);
        expect(isPrototype(42)).toBe(false);
        expect(isPrototype('string')).toBe(false);
        expect(isPrototype({})).toBe(false);
        expect(isPrototype(true)).toBe(false);
        expect(isPrototype(Symbol('symbol'))).toBe(false);
        expect(isPrototype(function () {})).toBe(false);
    });

    test('测试2', () => {
        expect(isPrototype(Function.prototype)).toBe(true);
        expect(isPrototype(String.prototype)).toBe(true);
        expect(isPrototype(Number.prototype)).toBe(true);
        expect(isPrototype(Boolean.prototype)).toBe(true);
        expect(isPrototype(Object.prototype)).toBe(true);
        expect(isPrototype(Date.prototype)).toBe(true);
        expect(isPrototype(RegExp.prototype)).toBe(true);
        expect(isPrototype(Error.prototype)).toBe(true);
        expect(isPrototype(Map.prototype)).toBe(true);
        expect(isPrototype(Set.prototype)).toBe(true);
        expect(isPrototype(WeakMap.prototype)).toBe(true);
        expect(isPrototype(Promise.prototype)).toBe(true);
        expect(isPrototype(Symbol.prototype)).toBe(true);
    });

    test('测试3', () => {
        function TestConstructor() {}

        const prototype = TestConstructor.prototype;

        // @ts-ignore
        const instance = new TestConstructor();

        expect(isPrototype(prototype)).toBe(true);
        expect(isPrototype(instance)).toBe(false);
    });
});
