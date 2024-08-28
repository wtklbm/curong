// @ts-nocheck

import { shallowEqual } from '../src';

describe('@curong/object/shallowEqual', () => {
    const falsy = [, '', 0, -0, false, NaN, null, undefined];

    test('普通测试', () => {
        expect(shallowEqual({}, {})).toBe(true);

        const o1 = {
            name: 'wtklbm'
        };

        const o2 = {
            name: 'wtklbm'
        };

        const o3 = {
            data: 'text'
        };

        const o4 = {
            name: 'wtklbm',
            data: 'text'
        };

        const o5 = {
            name: {
                data: 'wtklbm'
            }
        };

        const o6 = {
            name: {
                data: 'wtklbm'
            }
        };

        expect(shallowEqual(o1, o2)).toBe(true);
        expect(shallowEqual(o1, null)).toBe(false);
        expect(shallowEqual(null, o2)).toBe(false);
        expect(shallowEqual(o1, o3)).toBe(false);
        expect(shallowEqual(o1, o4)).toBe(false);
        expect(shallowEqual(o5, o6)).toBe(false);
    });

    test('如果任一参数为 null，则返回 false', () => {
        expect(shallowEqual(null, {})).toEqual(false);
        expect(shallowEqual({}, null)).toEqual(false);
    });

    test('如果两个参数都是 null 或 undefined，则返回 true', () => {
        expect(shallowEqual(null, null)).toEqual(true);
        expect(shallowEqual(undefined, undefined)).toEqual(true);
    });

    test('如果参数是浅层相等，则返回 true', () => {
        expect(
            shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })
        ).toEqual(true);
    });

    test('如果参数不是对象且不相等，则返回 false', () => {
        expect(shallowEqual(1, 2)).toEqual(false);
    });

    test('如果只有一个参数不是对象，则返回 false', () => {
        expect(shallowEqual(1, {})).toEqual(false);
    });

    test('如果第一个参数的键过多，则返回 false', () => {
        expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual(
            false
        );
    });

    test('如果第二个参数的键过多，则返回 false', () => {
        expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual(
            false
        );
    });

    test('如果值不是原始值但 === 相等，则返回 true', () => {
        let obj = {};
        expect(
            shallowEqual({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })
        ).toEqual(true);
    });

    // 后续测试用例复制自 lodash 测试
    test('如果参数不是浅层相等，则返回 false', () => {
        expect(
            shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} })
        ).toEqual(false);
    });

    test('应提供正确的 `compare` 参数', () => {
        let argsList = [];
        const arr = [1, 2];
        const object1 = { a: arr, b: null };
        const object2 = { a: arr, b: null };

        object1.b = object2;
        object2.b = object1;

        const expected = [
            [object1, object2],
            [object1.a, object2.a, 'a'],
            [object1.b, object2.b, 'b']
        ];

        shallowEqual(object1, object2, (a, b, k) => {
            argsList.push([a, b,k]);
            return Object.is(a, b);
        });

        expect(argsList).toEqual(expected);
    });

    test('如果 `compare` 返回 `true`，应不处理比较', () => {
        const compare = function (value) {
            return typeof value === 'string' || undefined;
        };

        expect(shallowEqual('a', 'b', compare)).toEqual(true);
        expect(shallowEqual(['a'], ['b'], compare)).toEqual(true);
        expect(shallowEqual({ '0': 'a' }, { '0': 'b' }, compare)).toEqual(
            true
        );
    });

    test('如果 `compare` 返回 `false`，应不处理比较', () => {
        const compare = function (value) {
            return typeof value === 'string' ? false : undefined;
        };

        expect(shallowEqual('a', 'a', compare)).toEqual(false);
        expect(shallowEqual(['a'], ['a'], compare)).toEqual(false);
        expect(shallowEqual({ '0': 'a' }, { '0': 'a' }, compare)).toEqual(
            false
        );
    });

    test('即使 `compare` 不返回布尔值，也应返回布尔值', () => {
        let actual = shallowEqual('a', 'b', () => 'c');
        expect(actual).toEqual(true);

        const values = falsy.filter(v => v !== undefined);
        const expected = values.map(() => false);

        actual = [];
        values.forEach(value => {
            actual.push(shallowEqual('a', 'a', () => value));
        });

        expect(actual).toEqual(expected);
    });

    test('应将通过 `Object.create(null)` 创建的对象视为普通对象', () => {
        function Foo() {
            this.a = 1;
        }
        Foo.prototype.constructor = null;

        const object2 = { a: 1 };
        expect(shallowEqual(new Foo(), object2)).toEqual(true);

        const object1 = Object.create(null);
        object1.a = 1;
        expect(shallowEqual(object1, object2)).toEqual(true);
    });
});
