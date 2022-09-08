import { isOwnProperty } from '../src';

describe('@curong/types/isOwnProperty', () => {
    test('测试1', () => {
        expect(isOwnProperty(null, 'a')).toBe(false);
        expect(isOwnProperty(undefined, 'a')).toBe(false);
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

        expect(isOwnProperty(o1, 'call')).toBe(false);
        expect(isOwnProperty(o1, 'toString')).toBe(false);

        expect(isOwnProperty(o1, 'a')).toBe(false);
        expect(isOwnProperty(o2, 'a')).toBe(true);
        expect(isOwnProperty(o3, 'a')).toBe(false);
        expect(isOwnProperty(o4, 'a')).toBe(false);
        expect(isOwnProperty(o5, 'a')).toBe(true);
        expect(isOwnProperty(o6, 'a')).toBe(true);
        expect(isOwnProperty(o7, 'a')).toBe(false);
        expect(isOwnProperty(o8, 'a')).toBe(true);

        expect(isOwnProperty(o1, 1)).toBe(false);
        expect(isOwnProperty(o2, 1)).toBe(false);
        expect(isOwnProperty(o3, 1)).toBe(false);
        expect(isOwnProperty(o4, 1)).toBe(true);
        expect(isOwnProperty(o5, 1)).toBe(true);
        expect(isOwnProperty(o6, 1)).toBe(false);
        expect(isOwnProperty(o7, 1)).toBe(true);
        expect(isOwnProperty(o8, 1)).toBe(true);

        expect(isOwnProperty(o1, s)).toBe(false);
        expect(isOwnProperty(o2, s)).toBe(false);
        expect(isOwnProperty(o3, s)).toBe(true);
        expect(isOwnProperty(o4, s)).toBe(false);
        expect(isOwnProperty(o5, s)).toBe(false);
        expect(isOwnProperty(o6, s)).toBe(true);
        expect(isOwnProperty(o7, s)).toBe(true);
        expect(isOwnProperty(o8, s)).toBe(true);
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

        expect(isOwnProperty(o, s)).toBe(true);

        // @ts-ignore
        o.a = undefined;
        expect(isOwnProperty(o, 'a')).toBe(true);
    });

    test('测试4', () => {
        class Parent extends Object {
            constructor(protected p: string) {
                super();
            }
        }

        class Child extends Parent {
            constructor(public c: string, p: string) {
                super(p);
            }
        }

        const c = new Child('x', 'o');

        expect(isOwnProperty(c, 'p')).toBe(true);
        expect(isOwnProperty(c, 'c')).toBe(true);
        expect(isOwnProperty(c, 'toString')).toBe(false);
    });
});
