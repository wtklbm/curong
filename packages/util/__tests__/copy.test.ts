/**
 * @jest-environment jsdom
 */

// @ts-nocheck

import { isPlainObject } from '@curong/types';

import { copy } from '../src';

describe('@curong/util/copy', () => {
    test('测试1', () => {
        expect(() => copy(new Promise(() => {}))).toThrow();
        expect(copy(1)).toBe(1);
        expect(copy(null)).toBe(null);
        expect(copy(undefined)).toBe(undefined);
        expect(copy({})).toEqual({});
    });

    test('测试2', () => {
        expect(copy(null)).toEqual(null);
        expect(copy(undefined)).toEqual(undefined);

        class A {
            constructor() {}
        }

        const ab = new ArrayBuffer(16);
        const i8 = new Int8Array(ab);
        i8.set([7]);

        var view = new DataView(ab, 0);

        const newView = new DataView(view.buffer);

        const obj = {
            buffer: Buffer.from('buffer value'),
            char: '3',
            string: new String('string'),
            object: { d1: 'xx', d2: 'oo' },
            time: new Date('2020-01-01'),
            regexp: /\d+/gi,
            typeError: new TypeError('type error'),
            error: new Error('error'),
            classF: new A(),
            arrayBuffer: ab,
            dataView: view,
            newView,
            nua: null,
            v: undefined,
            bigInt: BigInt(1n),
            o: {
                a: {
                    b: {
                        c: {
                            d: [1, 'xx', true],
                            v: 'vx'
                        }
                    }
                }
            },
            set: new Set([1, 2, 3, { a: [1, { b: 2 }] }]),
            map: new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
        };

        const ret = copy(obj);

        expect(obj.buffer === ret.buffer).toBe(false);
        expect(obj.char === ret.char).toBe(true);
        expect(obj.string === ret.string).toBe(false);
        expect(obj.object === ret.object).toBe(false);
        expect(obj.time === ret.time).toBe(false);
        expect(obj.regexp === ret.regexp).toBe(false);
        expect(obj.typeError === ret.typeError).toBe(false);
        expect(obj.error === ret.error).toBe(false);
        expect(obj.error.name === ret.error.name).toBe(true);
        expect(obj.error.stack === ret.error.stack).toBe(true);
        expect(obj.error.message === ret.error.message).toBe(true);
        expect(obj.classF === ret.classF).toBe(false);
        expect(obj.arrayBuffer === ret.arrayBuffer).toBe(false);
        expect(obj.dataView === ret.dataView).toBe(false);
        expect(obj.newView === ret.newView).toBe(false);
        expect(obj.bigInt === ret.bigInt).toBe(true);
        expect(obj.o === ret.o).toBe(false);
        expect(obj.set === ret.set).toBe(false);
        expect(obj.map === ret.map).toBe(false);
        expect(obj.o.a === ret.o.a).toBe(false);
        expect(obj.o.a.b === ret.o.a.b).toBe(false);
        expect(obj.o.a.b.c === ret.o.a.b.c).toBe(false);
        expect(obj.o.a.b.c.d === ret.o.a.b.c.d).toBe(false);
        expect(obj.o.a.b.c.d[0] === ret.o.a.b.c.d[0]).toBe(true);
        expect(obj.o.a.b.c.d[1] === ret.o.a.b.c.d[1]).toBe(true);
        expect(obj.o.a.b.c.d[2] === ret.o.a.b.c.d[2]).toBe(true);
        expect(obj.o.a.b.c.v === ret.o.a.b.c.v).toBe(true);
    });

    test('测试3', () => {
        let obj = {
            fn: () => {},
            B: new Boolean(),
            n: new Number(),
            r: new RegExp(''),
            f32: new Float32Array(),
            f64: new Float64Array(),
            i8: new Int8Array(),
            i16: new Int16Array(),
            i32: new Int32Array(),
            u8: new Uint8Array(),
            u8a: new Uint8ClampedArray(),
            u16: new Uint16Array(),
            u32: new Uint32Array(),
            // b64: new BigInt64Array(8),
            // ub64: new BigUint64Array(),
            o: new Object({ a: 1 })
        };

        const ret = copy(obj);
        expect(obj.fn === ret.fn).toBe(false);
        expect(obj.B === ret.B).toBe(false);
        expect(obj.n === ret.n).toBe(false);
        expect(obj.r === ret.r).toBe(false);
        expect(obj.f32 === ret.f32).toBe(false);
        expect(obj.f64 === ret.f64).toBe(false);
        expect(obj.i8 === ret.i8).toBe(false);
        expect(obj.i16 === ret.i16).toBe(false);
        expect(obj.i32 === ret.i32).toBe(false);
        expect(obj.u8 === ret.u8).toBe(false);
        expect(obj.u8a === ret.u8a).toBe(false);
        expect(obj.u16 === ret.u16).toBe(false);
        expect(obj.u32 === ret.u32).toBe(false);
        expect(obj.o === ret.o).toBe(false);
        // expect(obj.b64 === ret.b64).toBe(false);
        // expect(obj.ub64 === ret.ub64).toBe(false);
    });

    test('测试4', () => {
        const createError = (): Error => {
            const error = new Error();
            error.name = 'test';
            error.message = 'test message';
            error.info = 'test info';

            return error;
        };

        let obj = {
            e: createError(),
            ev: new EvalError(),
            r: new RangeError(),
            re: new ReferenceError(),
            s: new SyntaxError(),
            t: new TypeError()
        };

        const ret = copy(obj);
        expect(obj.e === ret.e).toBe(false);
        expect(obj.e.info === ret.e.info).toBe(true);
        expect(obj.e.stack === ret.e.stack).toBe(true);
        expect(obj.e.name === ret.e.name).toBe(true);
        expect(obj.e.message === ret.e.message).toBe(true);
        expect(obj.ev === ret.ev).toBe(false);
        expect(obj.r === ret.r).toBe(false);
        expect(obj.re === ret.re).toBe(false);
        expect(obj.s === ret.s).toBe(false);
        expect(obj.t === ret.t).toBe(false);
    });

    test('测试5', () => {
        const fn1 = (a: number, b: number) => a + b;
        fn1.state = { name: 'fn1', id: 1 };

        const clonedFn1 = copy(fn1);
        expect(fn1 === clonedFn1).toBe(false);
        expect(fn1(1, 1) === clonedFn1(1, 1)).toBe(true);
        expect(fn1.name === 'fn1').toBe(true);
        expect(isPlainObject(clonedFn1.state)).toBe(true);
        expect(fn1.state === clonedFn1.state).toBe(false);
        expect(fn1.state.name === clonedFn1.state.name).toBe(true);
        expect(fn1.state.id === clonedFn1.state.id).toBe(true);
    });

    test('测试6', () => {
        function fn2(a: number, b: number) {
            return a + b;
        }

        fn2.state = { name: 'fn2', id: 2 };
        const clonedFn2 = copy(fn2);
        expect(fn2(1, 1) === clonedFn2(1, 1)).toBe(true);
        expect(fn2.name === 'fn2').toBe(true);
        expect(fn2 === clonedFn2).toBe(false);
        expect(isPlainObject(clonedFn2.state)).toBe(true);
        expect(fn2.state === clonedFn2.state).toBe(false);
        expect(fn2.state.name === clonedFn2.state.name).toBe(true);
        expect(fn2.state.id === clonedFn2.state.id).toBe(true);
    });

    test('测试7', () => {
        function* fn3(a: number, b: number) {
            return a + b;
        }
        fn3.state = { name: 'fn3', id: 3 };

        const clonedFn3 = copy(fn3);
        expect(fn3(1, 1).next().value === clonedFn3(1, 1).next().value).toBe(
            true
        );
        expect(fn3.name === 'fn3').toBe(true);
        expect(isPlainObject(clonedFn3.state)).toBe(true);
        expect(fn3 === clonedFn3).toBe(false);
        expect(fn3.state === clonedFn3.state).toBe(false);
        expect(fn3.state.name === clonedFn3.state.name).toBe(true);
        expect(fn3.state.id === clonedFn3.state.id).toBe(true);
    });

    test('测试8', () => {
        async function fn4(a: number, b: number) {
            return a + b;
        }

        fn4.state = { name: 'fn4', id: 4 };

        const clonedFn4 = copy(fn4);
        async function f() {
            expect((await fn4(1, 1)) === (await clonedFn4(1, 1))).toBe(true);
        }

        f();

        expect(fn4.name === 'fn4').toBe(true);
        expect(fn4 === clonedFn4).toBe(false);
        expect(isPlainObject(clonedFn4.state)).toBe(true);
        expect(fn4.state === clonedFn4.state).toBe(false);
        expect(fn4.state.name === clonedFn4.state.name).toBe(true);
        expect(fn4.state.id === clonedFn4.state.id).toBe(true);
    });

    test('测试9', () => {
        const value = Buffer.from('xx');
        value.state = { name: 'Buffer', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试10', () => {
        const value = new String('xx');
        value.state = { name: 'String', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试11', () => {
        const value = new Number(0.01);
        value.state = { name: 'Number', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试12', () => {
        const value = new Boolean(true);
        value.state = { name: 'Boolean', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试13', () => {
        const value = new RegExp(/\d+/gi);
        value.state = { name: 'RegExp', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.flags === clonedValue.flags).toBe(true);
        expect(value.source === clonedValue.source).toBe(true);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.lastIndex === clonedValue.lastIndex).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试14', () => {
        const value = new Date('2020-01-01');
        value.state = { name: 'Date', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.getTime() === clonedValue.getTime()).toBe(true);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试15', () => {
        const value = new Set([1, 2, 3, 2, 2, 4]);
        value.state = { name: 'Set', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect([...value].join(',') === [...clonedValue].join(',')).toBe(true);
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试16', () => {
        const value = new Map([
            [1, 11],
            [2, 22],
            [3, 33],
            [2, 33],
            [2, 44],
            [4, 55]
        ]);
        value.state = { name: 'Map', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(JSON.stringify(value) === JSON.stringify(clonedValue)).toBe(
            true
        );
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.state === clonedValue.state).toBe(false);
        expect(value.state.name === clonedValue.state.name).toBe(true);
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试17', () => {
        const value = new ArrayBuffer(6);
        value.state = { name: 'ArrayBuffer', id: 0 };
        const view = new DataView(value);
        view.setUint8(0, 7);
        view.setUint8(1, 1);
        view.setUint8(2, 3);
        view.setUint8(3, 2);
        view.setUint8(4, 5);
        view.setUint8(5, 6);

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(view.getUint8(0) === new DataView(cloned).getUint8(0)).toBe(
            true
        );
        expect(view.getUint8(1) === new DataView(cloned).getUint8(1)).toBe(
            true
        );
        expect(view.getUint8(2) === new DataView(cloned).getUint8(2)).toBe(
            true
        );
        expect(view.getUint8(3) === new DataView(cloned).getUint8(3)).toBe(
            true
        );
        expect(view.getUint8(4) === new DataView(cloned).getUint8(4)).toBe(
            true
        );
        expect(view.getUint8(5) === new DataView(cloned).getUint8(5)).toBe(
            true
        );

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试18', () => {
        const view = new DataView(new ArrayBuffer(6));
        view.setUint8(0, 7);
        view.setUint8(1, 1);
        view.setUint8(2, 3);
        view.setUint8(3, 2);
        view.setUint8(4, 5);
        view.setUint8(5, 6);

        view.state = { name: 'DataView', id: 0 };

        const clonedValue = copy(view);

        expect(view === clonedValue).toBe(false);

        expect(view.getUint8(0) === clonedValue.getUint8(0)).toBe(true);
        expect(view.getUint8(1) === clonedValue.getUint8(1)).toBe(true);
        expect(view.getUint8(2) === clonedValue.getUint8(2)).toBe(true);
        expect(view.getUint8(3) === clonedValue.getUint8(3)).toBe(true);
        expect(view.getUint8(4) === clonedValue.getUint8(4)).toBe(true);
        expect(view.getUint8(5) === clonedValue.getUint8(5)).toBe(true);

        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(view.state === clonedValue.state).toBe(false);
        expect(view.state.name === clonedValue.state.name).toBe(true);
        expect(view.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试19', () => {
        const value = new BigInt64Array(6);
        value.state = { name: 'BigInt64Array', id: 0 };
        value[0] = 7n;
        value[1] = 1n;
        value[2] = 3n;
        value[3] = 2n;
        value[4] = 5n;
        value[5] = 6n;

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(value[0] === cloned[0]).toBe(true);
        expect(value[1] === cloned[1]).toBe(true);
        expect(value[2] === cloned[2]).toBe(true);
        expect(value[3] === cloned[3]).toBe(true);
        expect(value[4] === cloned[4]).toBe(true);
        expect(value[5] === cloned[5]).toBe(true);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试20', () => {
        function test(value: any) {
            value.state = { name: 'Arguments', id: 0 };
            value[0] = 7n;
            value[1] = 1n;
            value[2] = 3n;
            value[3] = 2n;
            value[4] = 5n;
            value[5] = 6n;

            const cloned = copy(value);

            expect(value === cloned).toBe(false);
            expect(value[0] === cloned[0]).toBe(true);
            expect(value[1] === cloned[1]).toBe(true);
            expect(value[2] === cloned[2]).toBe(true);
            expect(value[3] === cloned[3]).toBe(true);
            expect(value[4] === cloned[4]).toBe(true);
            expect(value[5] === cloned[5]).toBe(true);

            expect(isPlainObject(cloned.state)).toBe(true);
            expect(value.state === cloned.state).toBe(false);
            expect(value.state.name === cloned.state.name).toBe(true);
            expect(value.state.id === cloned.state.id).toBe(true);
        }

        class A {}
        const ab = new ArrayBuffer(16);
        const i8 = new Int8Array(ab);
        i8.set([7]);
        var view = new DataView(ab, 0);
        const newView = new DataView(view.buffer);
        const obj = {
            buffer: Buffer.from('buffer value'),
            char: '3',
            string: new String('string'),
            object: { d1: 'xx', d2: 'oo' },
            time: new Date('2020-01-01'),
            regexp: /\d+/gi,
            typeError: new TypeError('type error'),
            error: new Error('error'),
            classF: new A(),
            arrayBuffer: ab,
            dataView: view,
            newView,
            bigInt: BigInt(1n),
            o: {
                a: {
                    b: {
                        c: {
                            d: [1, 'xx', true],
                            v: 'vx'
                        }
                    }
                }
            },
            set: new Set([1, 2, 3, { a: [1, { b: 2 }] }]),
            map: new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
        };

        test(obj);
    });

    test('测试21', () => {
        const value = new File(['this is test'], 'test');
        value.state = { name: 'File', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);
        expect(value.lastModified === cloned.lastModified).toBe(true);
        expect(value.type === cloned.type).toBe(true);
        expect(value.lastModifiedDate === cloned.lastModifiedDate).toBe(true);
        expect(value.name === cloned.name).toBe(true);
        expect(value.size === cloned.size).toBe(true);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试22', () => {
        const value = new Blob(['this is test']);
        value.state = { name: 'Blob', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);
        expect(value.type === cloned.type).toBe(true);
        expect(value.size === cloned.size).toBe(true);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试23', () => {
        const value = new FileReader();
        value.state = { name: 'FileReader', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试24', () => {
        const value = Object.create(null);
        value.state = { name: 'Object', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试25', () => {
        const value = new BigUint64Array(6);
        value.state = { name: 'BigUint64Array', id: 0 };
        value[0] = 7n;
        value[1] = 1n;
        value[2] = 3n;
        value[3] = 2n;
        value[4] = 5n;
        value[5] = 6n;

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(value[0] === cloned[0]).toBe(true);
        expect(value[1] === cloned[1]).toBe(true);
        expect(value[2] === cloned[2]).toBe(true);
        expect(value[3] === cloned[3]).toBe(true);
        expect(value[4] === cloned[4]).toBe(true);
        expect(value[5] === cloned[5]).toBe(true);

        expect(isPlainObject(cloned.state)).toBe(true);
        expect(value.state === cloned.state).toBe(false);
        expect(value.state.name === cloned.state.name).toBe(true);
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试26', () => {
        let value = {
            married: true,
            age: 1,
            name: 'xxx',
            girlfriend: null,
            boyfriend: undefined,
            flag: Symbol('man'),
            home: { name: '北京' },
            set: new Set(),
            map: new Map(),
            getName: function () {},
            hobbies: ['1', '2', '3'],
            error: new Error('我错了'),
            pattern: /^reg$/gi,
            arr: [],
            b: BigInt(2)
        };

        value.set.add(1);
        value.map.set('name', 'xxx');
        value.obj = value;
        value.arr[0] = value;
        value.arr[1] = value.arr;

        const cloned = copy(value);

        expect(cloned.married === value.married).toBe(true);
        expect(cloned.age === value.age).toBe(true);
        expect(cloned.name === value.name).toBe(true);
        expect(cloned.girlfriend === value.girlfriend).toBe(true);
        expect(cloned.b === value.b).toBe(true);
        expect(cloned.boyfriend === value.boyfriend).toBe(true);

        expect(cloned.flag.valueOf() === value.flag.valueOf()).toBe(true);
        expect(cloned.flag === value.flag).toBe(false);

        expect(cloned.home === value.home).toBe(false);
        expect(
            Object.keys(cloned.home).length === Object.keys(value.home).length
        ).toBe(true);
        expect(cloned.home.name === value.home.name).toBe(true);

        expect(cloned.set === value.set).toBe(false);
        expect(cloned.set.size === value.set.size).toBe(true);
        expect(cloned.set.has(1) === value.set.has(1)).toBe(true);

        expect(cloned.map === value.map).toBe(false);
        expect(cloned.map.size === value.map.size).toBe(true);
        expect(cloned.map.get('name') === value.map.get('name')).toBe(true);

        expect(cloned.getName === value.getName).toBe(false);
        expect(cloned.getName.toString() === value.getName.toString()).toBe(
            true
        );

        expect(cloned.hobbies === value.hobbies).toBe(false);
        expect(cloned.hobbies.length === value.hobbies.length).toBe(true);
        expect(cloned.hobbies[0] === value.hobbies[0]).toBe(true);
        expect(cloned.hobbies[1] === value.hobbies[1]).toBe(true);
        expect(cloned.hobbies[2] === value.hobbies[2]).toBe(true);

        expect(cloned.error === value.error).toBe(false);
        expect(cloned.error.message === value.error.message).toBe(true);
        expect(cloned.error.name === value.error.name).toBe(true);
        expect(cloned.error.stack === value.error.stack).toBe(true);

        expect(cloned.pattern === value.pattern).toBe(false);
        expect(cloned.pattern.lastIndex === value.pattern.lastIndex).toBe(true);
        expect(cloned.pattern.flags === value.pattern.flags).toBe(true);
        expect(cloned.pattern.source === value.pattern.source).toBe(true);

        expect(cloned.arr === value.arr).toBe(false);
        expect(cloned.arr[0] === value.arr[0]).toBe(false);
        expect(cloned.arr[0] === cloned).toBe(true);
        expect(cloned.arr[1] === value.arr).toBe(false);

        expect(cloned.obj === value.obj).toBe(false);
        expect(cloned.obj === value).toBe(false);
        expect(cloned.obj === cloned).toBe(true);

        expect(Object.keys(cloned).length === Object.keys(value).length).toBe(
            true
        );
    });

    test('测试27', () => {
        const config: any = {
            a: {
                t: ''
            }
        };

        config.a.b = config;
        const cfg = copy(config);

        expect(cfg !== config).toBe(true);
        expect(cfg.a !== config.a).toBe(true);
        expect(cfg.a.t === config.a.t).toBe(true);

        for (let i = 0; i < 10; i++) {
            let cfg = copy(config);
            expect(cfg.a.t === config.a.t).toBe(true);
            cfg.a.t = i;
            expect(cfg !== config).toBe(true);
            expect(cfg.a !== config.a).toBe(true);
            expect(cfg.a.t !== config.a.t).toBe(true);
            expect(cfg.a.t === i).toBe(true);
        }
    });

    test('测试28', () => {
        const obj = {
            a: 1,
            b: {
                c: 2,
                d: [3, 4, 5]
            }
        };

        const cfg = copy(obj);

        expect(cfg).toEqual(obj); // 包含了相同的属性和值
        expect(cfg).not.toBe(obj); // 不是同一个引用

        // 修改原始对象不会影响副本
        obj.a = 100;
        obj.b.c = 200;

        expect(cfg.a).toBe(1);
        expect(cfg.b.c).toBe(2);

        // 修改副本不会影响原始对象
        cfg.a = 1000;
        cfg.b.c = 2000;

        expect(obj.a).toBe(100);
        expect(obj.b.c).toBe(200);
    });

    test('测试29', () => {
        const obj1 = { value: 1 };
        const obj2 = { value: 2 };
        const obj3 = { value: 3 };

        obj1.obj2 = obj2;
        obj2.obj3 = obj3;
        obj3.obj1 = obj1;

        const cfg = copy(obj1);

        expect(cfg.obj2.obj3.obj1).toEqual(cfg);
        expect(cfg.obj2.obj3.obj1).not.toBe(obj1);
    });

    test('测试30', () => {
        const arr = [1, 2, [3, 4, [5, 6]]];

        const cfg = copy(arr);

        expect(cfg).toEqual(arr);
        expect(cfg).not.toBe(arr);

        // 修改原始数组不会影响副本
        arr[0] = 100;
        arr[2][0] = 300;

        expect(cfg[0]).toBe(1);
        expect(cfg[2][0]).toBe(3);

        // 修改副本不会影响原始数组
        cfg[0] = 1000;
        cfg[2][0] = 3000;

        expect(arr[0]).toBe(100);
        expect(arr[2][0]).toBe(300);
    });

    test('测试31', () => {
        const obj = {
            arr: [],
            get value() {
                return 'hello';
            },
            set arrVal(val) {
                this.arr.push(val);
            }
        };

        const cfg = copy(obj);

        expect(cfg).toEqual(obj);
        expect(cfg).not.toBe(obj);

        expect(cfg.arr).not.toBe(obj.arr);
        expect(cfg.value).toBe(obj.value);

        obj.arrVal = 1;
        cfg.arrVal = 2;

        expect(obj.arr[0]).toBe(1);
        expect(cfg.arr[0]).toBe(2);
        expect(obj.arr.length).toBe(cfg.arr.length);
        expect(obj.arr[0]).not.toBe(cfg.arr[0]);
    });

    test('测试32', () => {
        const obj = new FormData();
        obj.append('name', 'John');
        obj.append('age', '30');
        obj.test = 1;
        obj.isOk = true;

        const cfg = copy(obj);

        for (const [key, value] of cfg.entries()) {
            expect(value).toBe(obj.get(key));
        }

        expect(cfg.test).toBe(1);
        expect(cfg.isOk).toBe(true);
        expect(cfg.test).toBe(obj.test);
        expect(cfg.isOk).toBe(obj.isOk);

        obj.arrVal = 1;
        cfg.arrVal = 2;

        expect(obj.arrVal).toBe(1);
        expect(cfg.arrVal).toBe(2);
    });
});
