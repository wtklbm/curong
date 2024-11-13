// @ts-nocheck

import { hasOwnProperty } from '..';

describe('@curong/types/hasOwnProperty', () => {
    test('测试1', () => {
        expect(hasOwnProperty(null, 'a')).toBe(false);
        expect(hasOwnProperty(undefined, 'a')).toBe(false);
        expect(hasOwnProperty('', null)).toBe(false);
        expect(hasOwnProperty('', undefined)).toBe(false);
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

        expect(hasOwnProperty(o1, 'call')).toBe(false);
        expect(hasOwnProperty(o1, 'toString')).toBe(false);

        expect(hasOwnProperty(o1, 'a')).toBe(false);
        expect(hasOwnProperty(o2, 'a')).toBe(true);
        expect(hasOwnProperty(o3, 'a')).toBe(false);
        expect(hasOwnProperty(o4, 'a')).toBe(false);
        expect(hasOwnProperty(o5, 'a')).toBe(true);
        expect(hasOwnProperty(o6, 'a')).toBe(true);
        expect(hasOwnProperty(o7, 'a')).toBe(false);
        expect(hasOwnProperty(o8, 'a')).toBe(true);

        expect(hasOwnProperty(o1, 1)).toBe(false);
        expect(hasOwnProperty(o2, 1)).toBe(false);
        expect(hasOwnProperty(o3, 1)).toBe(false);
        expect(hasOwnProperty(o4, 1)).toBe(true);
        expect(hasOwnProperty(o5, 1)).toBe(true);
        expect(hasOwnProperty(o6, 1)).toBe(false);
        expect(hasOwnProperty(o7, 1)).toBe(true);
        expect(hasOwnProperty(o8, 1)).toBe(true);

        expect(hasOwnProperty(o1, s)).toBe(false);
        expect(hasOwnProperty(o2, s)).toBe(false);
        expect(hasOwnProperty(o3, s)).toBe(true);
        expect(hasOwnProperty(o4, s)).toBe(false);
        expect(hasOwnProperty(o5, s)).toBe(false);
        expect(hasOwnProperty(o6, s)).toBe(true);
        expect(hasOwnProperty(o7, s)).toBe(true);
        expect(hasOwnProperty(o8, s)).toBe(true);
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

        expect(hasOwnProperty(o, s)).toBe(true);

        // @ts-ignore
        o.a = undefined;
        expect(hasOwnProperty(o, 'a')).toBe(true);
    });

    test('测试4', () => {
        class Parent extends Object {
            constructor(protected p: string) {
                super();
            }
        }

        class Child extends Parent {
            constructor(
                public c: string,
                p: string
            ) {
                super(p);
            }
        }

        const c = new Child('x', 'o');

        expect(hasOwnProperty(c, 'p')).toBe(true);
        expect(hasOwnProperty(c, 'c')).toBe(true);
        expect(hasOwnProperty(c, 'toString')).toBe(false);
    });

    test('测试5', () => {
        const example = {};
        expect(hasOwnProperty(example, 'prop')).toBe(false);

        example.prop = 'exists';
        expect(hasOwnProperty(example, 'prop')).toBe(true);
        example.prop = null;
        expect(hasOwnProperty(example, 'prop')).toBe(true);

        example.prop = undefined;
        expect(hasOwnProperty(example, 'prop')).toBe(true);
    });

    test('测试6', () => {
        const example = {};
        example.prop = 'exists';

        expect(hasOwnProperty(example, 'prop')).toBe(true);
        expect(hasOwnProperty(example, 'toString')).toBe(false);
        expect(hasOwnProperty(example, 'hasOwnProperty')).toBe(false);

        // `in` 运算符对目标对象的直接属性或继承属性均会返回 true：
        expect('prop' in example).toBe(true);
        expect('toString' in example).toBe(true);
        expect('hasOwnProperty' in example).toBe(true);
    });

    test('测试7', () => {
        const fruits = ['Apple', 'Banana', 'Watermelon', 'Orange'];
        expect(hasOwnProperty(fruits, 3)).toBe(true);
        expect(hasOwnProperty(fruits, 4)).toBe(false);
    });

    test('测试8', () => {
        const foo = {
            hasOwnProperty() {
                return false;
            },
            bar: 'The dragons be out of office'
        };

        expect(hasOwnProperty(foo, 'bar')).toBe(true);

        const foo2 = Object.create(null);
        foo2.prop = 'exists';
        expect(hasOwnProperty(foo2, 'prop')).toBe(true);
    });
});
