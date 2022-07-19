import { isProperty } from '../src';

describe('@curong/types/isProperty', () => {
    test('测试1', () => {
        expect(isProperty(null, 'a')).toBe(false);
        expect(isProperty(undefined, 'a')).toBe(false);
    });

    test('测试2', () => {
        let s = Symbol('s1');
        let o1 = {};
        let o2 = { a: 1 };
        let o3 = { [s]: 'ss1' };
        let o4 = { 1: 10 };
        let o5 = { a: 1, 1: 10 };
        let o6 = { a: 1, [s]: 'ss1' };
        let o7 = { 1: 10, [s]: 'ss1' };
        let o8 = { a: 1, 1: 10, [s]: 'ss1' };

        // 可以访问原型上的属性
        expect(isProperty(o1, 'call')).toBe(false);
        expect(isProperty(o1, 'toString')).toBe(true);

        // 访问对象中的属性
        expect(isProperty(o1, 'a')).toBe(false);
        expect(isProperty(o2, 'a')).toBe(true);
        expect(isProperty(o3, 'a')).toBe(false);
        expect(isProperty(o4, 'a')).toBe(false);
        expect(isProperty(o5, 'a')).toBe(true);
        expect(isProperty(o6, 'a')).toBe(true);
        expect(isProperty(o7, 'a')).toBe(false);
        expect(isProperty(o8, 'a')).toBe(true);

        expect(isProperty(o1, 1)).toBe(false);
        expect(isProperty(o2, 1)).toBe(false);
        expect(isProperty(o3, 1)).toBe(false);
        expect(isProperty(o4, 1)).toBe(true);
        expect(isProperty(o5, 1)).toBe(true);
        expect(isProperty(o6, 1)).toBe(false);
        expect(isProperty(o7, 1)).toBe(true);
        expect(isProperty(o8, 1)).toBe(true);

        expect(isProperty(o1, s)).toBe(false);
        expect(isProperty(o2, s)).toBe(false);
        expect(isProperty(o3, s)).toBe(true);
        expect(isProperty(o4, s)).toBe(false);
        expect(isProperty(o5, s)).toBe(false);
        expect(isProperty(o6, s)).toBe(true);
        expect(isProperty(o7, s)).toBe(true);
        expect(isProperty(o8, s)).toBe(true);
    });

    test('测试3', () => {
        let s = Symbol('s1');
        let o = { a: 1 };

        Object.defineProperty(o, s, {
            value: 10,
            enumerable: false,
            configurable: false,
            writable: false
        });

        // 可以访问不可枚举的属性
        expect(isProperty(o, s)).toBe(true);

        // @ts-ignore
        o.a = undefined;

        // 即使一个值为 `undefined`，也仍然返回 `true`
        expect(isProperty(o, 'a')).toBe(true);
    });
});
