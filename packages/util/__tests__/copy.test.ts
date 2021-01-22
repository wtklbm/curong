import { copy } from '../src';
// @ts-ignore
import { isPlainObject } from '@curong/types';

describe('@curong/util/copy', () => {
    test('测试1', () => {
        expect(() => copy(new Promise(() => {}))).toThrow();
    });

    test('测试2', () => {
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
            // @ts-ignore
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
            // @ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
        value.state = { name: 'Buffer', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试10', () => {
        const value = new String('xx');
        // @ts-ignore
        value.state = { name: 'String', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试11', () => {
        const value = new Number(0.01);
        // @ts-ignore
        value.state = { name: 'Number', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试12', () => {
        const value = new Boolean(true);
        // @ts-ignore
        value.state = { name: 'Boolean', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试13', () => {
        const value = new RegExp(/\d+/gi);
        // @ts-ignore
        value.state = { name: 'RegExp', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.flags === clonedValue.flags).toBe(true);
        expect(value.source === clonedValue.source).toBe(true);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        expect(value.lastIndex === clonedValue.lastIndex).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试14', () => {
        const value = new Date('2020-01-01');
        // @ts-ignore
        value.state = { name: 'Date', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(value.getTime() === clonedValue.getTime()).toBe(true);
        expect(value.toString() === clonedValue.toString()).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试15', () => {
        const value = new Set([1, 2, 3, 2, 2, 4]);
        // @ts-ignore
        value.state = { name: 'Set', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect([...value].join(',') === [...clonedValue].join(',')).toBe(true);
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
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
        // @ts-ignore
        value.state = { name: 'Map', id: 0 };

        const clonedValue = copy(value);

        expect(value === clonedValue).toBe(false);
        expect(JSON.stringify(value) === JSON.stringify(clonedValue)).toBe(
            true
        );
        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(value.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试17', () => {
        const value = new ArrayBuffer(6);
        // @ts-ignore
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

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
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

        // @ts-ignore
        view.state = { name: 'DataView', id: 0 };

        const clonedValue = copy(view);

        expect(view === clonedValue).toBe(false);

        expect(view.getUint8(0) === clonedValue.getUint8(0)).toBe(true);
        expect(view.getUint8(1) === clonedValue.getUint8(1)).toBe(true);
        expect(view.getUint8(2) === clonedValue.getUint8(2)).toBe(true);
        expect(view.getUint8(3) === clonedValue.getUint8(3)).toBe(true);
        expect(view.getUint8(4) === clonedValue.getUint8(4)).toBe(true);
        expect(view.getUint8(5) === clonedValue.getUint8(5)).toBe(true);

        // @ts-ignore
        expect(isPlainObject(clonedValue.state)).toBe(true);
        // @ts-ignore
        expect(view.state === clonedValue.state).toBe(false);
        // @ts-ignore
        expect(view.state.name === clonedValue.state.name).toBe(true);
        // @ts-ignore
        expect(view.state.id === clonedValue.state.id).toBe(true);
    });

    test('测试19', () => {
        const value = new BigInt64Array(6);
        // @ts-ignore
        value.state = { name: 'BigInt64Array', id: 0 };
        // @ts-ignore
        value[0] = 7n;
        // @ts-ignore
        value[1] = 1n;
        // @ts-ignore
        value[2] = 3n;
        // @ts-ignore
        value[3] = 2n;
        // @ts-ignore
        value[4] = 5n;
        // @ts-ignore
        value[5] = 6n;

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(value[0] === cloned[0]).toBe(true);
        expect(value[1] === cloned[1]).toBe(true);
        expect(value[2] === cloned[2]).toBe(true);
        expect(value[3] === cloned[3]).toBe(true);
        expect(value[4] === cloned[4]).toBe(true);
        expect(value[5] === cloned[5]).toBe(true);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试20', () => {
        function test(value: any) {
            // @ts-ignore
            value.state = { name: 'Arguments', id: 0 };
            // @ts-ignore
            value[0] = 7n;
            // @ts-ignore
            value[1] = 1n;
            // @ts-ignore
            value[2] = 3n;
            // @ts-ignore
            value[3] = 2n;
            // @ts-ignore
            value[4] = 5n;
            // @ts-ignore
            value[5] = 6n;

            const cloned = copy(value);

            expect(value === cloned).toBe(false);
            expect(value[0] === cloned[0]).toBe(true);
            expect(value[1] === cloned[1]).toBe(true);
            expect(value[2] === cloned[2]).toBe(true);
            expect(value[3] === cloned[3]).toBe(true);
            expect(value[4] === cloned[4]).toBe(true);
            expect(value[5] === cloned[5]).toBe(true);

            // @ts-ignore
            expect(isPlainObject(cloned.state)).toBe(true);
            // @ts-ignore
            expect(value.state === cloned.state).toBe(false);
            // @ts-ignore
            expect(value.state.name === cloned.state.name).toBe(true);
            // @ts-ignore
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
            // @ts-ignore
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
        // @ts-ignore
        value.state = { name: 'File', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);
        expect(value.lastModified === cloned.lastModified).toBe(true);
        expect(value.type === cloned.type).toBe(true);
        // @ts-ignore
        expect(value.lastModifiedDate === cloned.lastModifiedDate).toBe(true);
        expect(value.name === cloned.name).toBe(true);
        expect(value.size === cloned.size).toBe(true);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试22', () => {
        const value = new Blob(['this is test']);
        // @ts-ignore
        value.state = { name: 'Blob', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);
        expect(value.type === cloned.type).toBe(true);
        expect(value.size === cloned.size).toBe(true);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试23', () => {
        const value = new FileReader();
        // @ts-ignore
        value.state = { name: 'FileReader', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试24', () => {
        const value = Object.create(null);
        // @ts-ignore
        value.state = { name: 'Object', id: 0 };

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });

    test('测试25', () => {
        const value = new BigUint64Array(6);
        // @ts-ignore
        value.state = { name: 'BigUint64Array', id: 0 };
        // @ts-ignore
        value[0] = 7n;
        // @ts-ignore
        value[1] = 1n;
        // @ts-ignore
        value[2] = 3n;
        // @ts-ignore
        value[3] = 2n;
        // @ts-ignore
        value[4] = 5n;
        // @ts-ignore
        value[5] = 6n;

        const cloned = copy(value);

        expect(value === cloned).toBe(false);

        expect(value[0] === cloned[0]).toBe(true);
        expect(value[1] === cloned[1]).toBe(true);
        expect(value[2] === cloned[2]).toBe(true);
        expect(value[3] === cloned[3]).toBe(true);
        expect(value[4] === cloned[4]).toBe(true);
        expect(value[5] === cloned[5]).toBe(true);

        // @ts-ignore
        expect(isPlainObject(cloned.state)).toBe(true);
        // @ts-ignore
        expect(value.state === cloned.state).toBe(false);
        // @ts-ignore
        expect(value.state.name === cloned.state.name).toBe(true);
        // @ts-ignore
        expect(value.state.id === cloned.state.id).toBe(true);
    });
});
