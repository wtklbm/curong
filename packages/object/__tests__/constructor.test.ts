import { constructor } from '../src';

describe('@curong/object/createWithNull', () => {
    test('测试1', () => {
        expect(constructor(null)).toEqual(null);
        expect(constructor(undefined)).toEqual(null);
    });

    test('测试2', () => {
        expect(constructor(true)).toEqual(Boolean);
        expect(constructor(false)).toEqual(Boolean);
        expect(constructor(0)).toEqual(Number);
        expect(constructor(-0)).toEqual(Number);
        expect(constructor(0.5)).toEqual(Number);
        expect(constructor(-0.5)).toEqual(Number);
        expect(constructor(10n)).toEqual(BigInt);
        expect(constructor(BigInt(-10))).toEqual(BigInt);
        expect(constructor(Symbol())).toEqual(Symbol);
        expect(constructor(Symbol('hey'))).toEqual(Symbol);
        expect(constructor([[]])).toEqual(Array);
        expect(constructor({})).toEqual(Object);

        expect(constructor(Boolean)).toEqual(Function);
        expect(constructor(new Boolean())).toEqual(Boolean);

        expect(constructor(Number)).toEqual(Function);
        expect(constructor(new Number())).toEqual(Number);

        expect(constructor(Function)).toEqual(Function);
        expect(constructor(new Function())).toEqual(Function);

        expect(constructor(Object())).toEqual(Object);
        expect(constructor(new Object())).toEqual(Object);

        expect(constructor({ constructor: 'foo' })).toEqual(Object);
        expect(constructor({})).toEqual(Object);
        expect(constructor({ hey: 'hello' })).toEqual(Object);
        expect(constructor({ hey: ['hello'] })).toEqual(Object);
    });

    test('测试3', () => {
        expect(constructor(Object.freeze({}))).toEqual(Object);
        expect(constructor(Object.create(null))).toEqual(null);
        const anotherObj = {};
        Object.setPrototypeOf(anotherObj, null);
        expect(constructor(anotherObj)).toEqual(null);
    });

    test('测试4', () => {
        const o = {
            constructor: 'xxx'
        };
        expect(constructor(o)).toEqual(Object);
        expect(o.constructor).toEqual('xxx');
        expect(Object.getPrototypeOf(o).constructor).toEqual(Object);
    });
});
