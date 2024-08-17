/**
 * @jest-environment jsdom
 */

import { Buffer as NodeBuffer } from 'buffer';

import {
    asyncStringify,
    asyncToStringMethod,
    stringify,
    toStringMethod
} from '../src/stringify';

declare function BigInt(n: number | bigint | string): bigint;

class ThrowingToString {
    toString() {
        throw new Error('No toString');
    }
}

class CustomTagThrowingToString {
    [Symbol.toStringTag] = 'CustomTagThrowingToString';
    toString() {
        throw new Error('No toString');
    }
}

describe('@curong/util/stringify', () => {
    test('测试', () => {
        expect(stringify([])).toBe('[]');
        expect(stringify([12, null])).toBe('[12,null]');
        expect(stringify([[2], [3]])).toBe('[[2],[3]]');

        // 类数组
        expect(stringify([1, , 2, , , 3])).toBe('[1,,2,,,3]');
        expect(
            stringify({
                0: '0',
                2: '2',
                4: '4',
                length: 3
            })
        ).toBe('{"0":"0","2":"2","4":"4","length":3}');
    });

    test('测试', () => {
        // @ts-ignore
        expect(stringify(0n)).toBe('0n');
        // @ts-ignore
        expect(stringify(-0n)).toBe('0n');
        // @ts-ignore
        expect(stringify(BigInt(1n))).toBe('1n');
        // @ts-ignore
        expect(stringify(Object(1n))).toBe('Object(1n)');
        // @ts-ignore
        expect(stringify(new Object(1n))).toBe('Object(1n)');
    });

    test('测试', () => {
        expect(stringify(true)).toBe('true');
        expect(stringify(Boolean(false))).toBe('false');
        expect(stringify(new Boolean(false))).toBe('new Boolean(false)');
        expect(stringify(Object(false))).toBe('new Boolean(false)');
        expect(stringify(new Object(false))).toBe('new Boolean(false)');
    });

    test('测试', () => {
        const buffer = new ArrayBuffer(8);
        const bufView = new Uint8Array(buffer);
        bufView[0] = 97;
        bufView[1] = 98;
        bufView[2] = 99;
        expect(stringify(bufView)).toBe(
            'Uint8Array.from([97,98,99,0,0,0,0,0])'
        );

        expect(stringify(new Int8Array())).toBe('Int8Array.from([])');
        expect(stringify(new Uint8Array())).toBe('Uint8Array.from([])');
        expect(stringify(new Uint8ClampedArray())).toBe(
            'Uint8ClampedArray.from([])'
        );
        expect(stringify(new Int16Array())).toBe('Int16Array.from([])');
        expect(stringify(new Uint16Array())).toBe('Uint16Array.from([])');
        expect(stringify(new Int32Array())).toBe('Int32Array.from([])');
        expect(stringify(new Uint32Array())).toBe('Uint32Array.from([])');
        expect(stringify(new Float32Array())).toBe('Float32Array.from([])');
        expect(stringify(new Float64Array())).toBe('Float64Array.from([])');
        expect(stringify(new BigInt64Array())).toBe('BigInt64Array.from([])');
        expect(stringify(new BigUint64Array())).toBe('BigUint64Array.from([])');
        expect(stringify(Buffer.from('x'))).toBe('Buffer.from([120])');
    });

    test('测试', () => {
        expect(stringify(new Map())).toBe('new Map([])');
        expect(stringify(new Set())).toBe('new Set([])');
    });

    test('测试', () => {
        expect(stringify(new Date(), { nearestDate: true })).toBe('new Date()');
        expect(stringify(new Date('2020-01-01'))).toBe(
            'new Date("2020-01-01T00:00:00.000Z")'
        );
    });

    test('测试', () => {
        // expect(stringify(document)).toBe();
        // expect(stringify(document.body)).toBe();
        // const iframe = document.createElement('iframe');
        // document.body.append(iframe);
        // const iframeDocument = iframe.contentDocument!;
        // const input = iframeDocument.createElement('input');
        // iframeDocument.body.append(input);
        // expect(stringify(input)).toBe();
        // expect(stringify(document.querySelectorAll('body'))).toBe();
        // expect(stringify(new Text())).toBe();
        // expect(stringify(document.createTextNode(''))).toBe();
        // expect(stringify(window)).toBe();
    });

    test('测试', () => {
        // @ts-ignore
        const e = new AggregateError([new Error('some error')], 'Hello');
        expect(stringify(e)).toBe(
            'new AggregateError([new Error("some error")], "Hello")'
        );

        expect(stringify(new Error())).toBe('new Error()');
        expect(stringify(new Error('xxx'))).toBe('new Error("xxx")');
        expect(stringify(new TypeError())).toBe('new TypeError()');
        expect(stringify(new SyntaxError())).toBe('new SyntaxError()');
        expect(stringify(new EvalError())).toBe('new EvalError()');
        expect(stringify(new ReferenceError())).toBe('new ReferenceError()');
        expect(stringify(new RangeError())).toBe('new RangeError()');
        expect(stringify(new DOMException())).toBe('new DOMException()');
        expect(stringify(new DOMException('xxx'))).toBe(
            'new DOMException("xxx")'
        );

        try {
            decodeURIComponent('%');
        } catch (e: any) {
            expect(stringify(e)).toBe('new URIError("URI malformed")');
        }
    });

    test('测试', () => {
        // const blob = new Blob(["Hello, world!"], { type: "text/plain" });
        // expect(stringify(blob)).toBe('');
        // expect(stringify(new File(['x'], 'test'))).toBe('');
        // expect(stringify(new FileReader())).toBe('');
        // const dataTransfer = new DataTransfer();
        // const file1 = new File(["内容1"], "file1.txt", { type: "text/plain" });
        // const file2 = new File(["内容2"], "file2.txt", { type: "text/plain" });
        // dataTransfer.items.add(file1);
        // dataTransfer.items.add(file2);
        // const fileList = dataTransfer.files;
        // expect(stringify(fileList)).toBe('');
    });

    test('测试', () => {
        (function () {
            expect(stringify(arguments)).toBe('[]');
        })();

        (function (x: number, s: string) {
            expect(stringify(arguments)).toBe('[0,"0"]');
        })(0, '0');

        expect(stringify(new Function('xxx'))).toBe(
            'function anonymous(\n) {\nxxx\n}'
        );
        expect(stringify(new Function('return async () => {}'))).toBe(
            'function anonymous(\n) {\nreturn async () => {}\n}'
        );

        expect(stringify(function fn() {})).toBe('function fn() { }');
        expect(stringify(async function fn() {})).toBe(
            'async function fn() { }'
        );

        expect(stringify(() => {})).toBe('() => { }');
        expect(stringify(async () => {})).toBe('async () => { }');

        expect(stringify(function fn() {})).toBe('function fn() { }');
        expect(stringify(async function fn() {})).toBe(
            'async function fn() { }'
        );

        class A {}
        expect(stringify(A)).toBe('class A {\n        }');
        expect(stringify(new A())).toBe('{}');

        expect(stringify(Object(Function('xxx')))).toBe(
            'function anonymous(\n) {\nxxx\n}'
        );
        expect(stringify(Object(new Function('xxx')))).toBe(
            'function anonymous(\n) {\nxxx\n}'
        );
        expect(stringify(Object(() => {}))).toBe('() => { }');
        expect(stringify(Object(function () {}))).toBe('function () { }');

        const fn1 = async () => {};
        const fn2 = fn1.bind(fn1);
        expect(stringify(fn1)).toBe('async () => { }');
        expect(stringify(fn2)).toBe('function () { [native code] }');

        expect(stringify(''.toString)).toBe(
            'function toString() { [native code] }'
        );
    });

    test('测试', () => {
        function* test1() {}
        expect(stringify(test1)).toBe('function* test1() { }');

        async function* test2() {}
        expect(stringify(test2)).toBe('async function* test2() { }');
    });

    test('测试', () => {
        const syncIter = {
            [Symbol.iterator]() {}
        };
        expect(stringify(syncIter)).toBe(
            '{[Symbol.iterator]:[Symbol.iterator]() { }}'
        );

        const asyncIter = {
            async *[Symbol.asyncIterator]() {}
        };
        expect(stringify(asyncIter)).toBe(
            '{[Symbol.asyncIterator]:async *[Symbol.asyncIterator]() { }}'
        );
    });

    test('测试', () => {
        expect(stringify(null)).toBe('null');
        expect(stringify(undefined)).toBe('undefined');
        expect(stringify(Object(null))).toBe('{}');
        expect(stringify(Object(undefined))).toBe('{}');
    });

    test('测试', () => {
        expect(stringify(Number.EPSILON)).toBe('2.220446049250313e-16');
        expect(stringify(-Number.EPSILON)).toBe('-2.220446049250313e-16');
        expect(stringify(Number.MAX_VALUE)).toBe('1.7976931348623157e+308');
        expect(stringify(-Number.MAX_VALUE)).toBe('-1.7976931348623157e+308');
        expect(stringify(Number.MIN_VALUE)).toBe('5e-324');
        expect(stringify(-Number.MIN_VALUE)).toBe('-5e-324');
        expect(stringify(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991');
        expect(stringify(-Number.MIN_SAFE_INTEGER)).toBe('9007199254740991');
        expect(stringify(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
        expect(stringify(-Number.MAX_SAFE_INTEGER)).toBe('-9007199254740991');

        expect(stringify(1.7976931348623157e103088)).toBe('Infinity');
        expect(stringify(-1.7976931348623157e103089)).toBe('-Infinity');
        expect(stringify(Infinity)).toBe('Infinity');
        expect(stringify(-Infinity)).toBe('-Infinity');
        expect(stringify(NaN)).toBe('NaN');
        expect(stringify(Number.NaN)).toBe('NaN');

        expect(stringify(0)).toBe('0');
        expect(stringify(-0)).toBe('-0');
        expect(stringify(1)).toBe('1');
        expect(stringify(1.1)).toBe('1.1');
        expect(stringify(-1)).toBe('-1');
        expect(stringify(-1.1)).toBe('-1.1');
        expect(stringify(-1e3)).toBe('-1000');
        expect(stringify(-1.1e3)).toBe('-1100');
        expect(stringify(123_456_789)).toBe('123456789');

        expect(stringify(Number(1))).toBe('1');
        expect(stringify(Object(1))).toBe('new Number(1)');
        expect(stringify(new Number(1))).toBe('new Number(1)');
    });

    test('测试', () => {
        expect(stringify({})).toBe('{}');
        expect(stringify({ length: 0 })).toBe('{"length":0}');
        expect(stringify({ size: 0 })).toBe('{"size":0}');
        expect(
            stringify({
                [Symbol.for('xxx')]: 'xxx'
            })
        ).toBe('{[Symbol.for("xxx")]:"xxx"}');
        expect(stringify(Object.create(null))).toBe('Object.create(null)');
    });

    test('测试', () => {
        expect(stringify(new Promise(() => {}))).toBe(
            'new Promise(() => { /* unknown */ })'
        );
        expect(stringify({ then: () => 1 })).toBe('{"then":() => 1}');
        expect(stringify(Promise.resolve())).toBe(
            'new Promise(() => { /* unknown */ })'
        );
    });

    test('测试', () => {
        expect(stringify(Function.prototype)).toBe('Function.prototype');
        expect(stringify(Object.prototype)).toBe('Object.prototype');
    });

    test('测试', () => {
        expect(stringify(/\d/)).toBe('/\\d/');
        expect(stringify(new RegExp('\\d'))).toBe('/\\d/');
    });

    test('测试', () => {
        expect(stringify('')).toBe('""');
        expect(stringify(String(''))).toBe('""');
        expect(stringify(new String(''))).toBe('new String("")');
    });

    test('测试', () => {
        expect(stringify(Symbol('x'))).toBe('Symbol("x")');
        expect(stringify(Object(Symbol('x')))).toBe('Symbol("x")');
    });

    test('测试', () => {
        expect(stringify(new URL('https://www.q.com'))).toBe(
            'new URL("https://www.q.com/")'
        );
        expect(stringify(new URLSearchParams('?user=abc&query=xyz'))).toBe(
            'new URLSearchParams("user=abc&query=xyz")'
        );
    });

    test('测试', () => {
        const cyclic: any = { a: 1, b: 2, c: 3 };
        cyclic.b = cyclic;
        const repr = stringify(cyclic);
        expect(repr).toContain('"a"');
        expect(repr).toContain('"b"');
        expect(repr).toContain('"c"');
        expect(repr).toContain('[cyclic]');
        expect(repr).toEqual('{"a":1,"b":[cyclic],"c":3}');
    });

    test('测试', () => {
        const cyclic: any[] = [1, 2, 3];
        cyclic.push(cyclic);
        cyclic.push(4);
        const repr = stringify(cyclic);
        expect(repr).toEqual('[1,2,3,[cyclic],4]');
    });

    test('测试', () => {
        expect(stringify([,])).toEqual('[,]');
        expect(stringify([, ,])).toEqual('[,,]');
        expect(stringify([, , , ,])).toEqual('[,,,,]');
        expect(stringify([1, , ,])).toEqual('[1,,,]');
        expect(stringify([, , 1, , 2])).toEqual('[,,1,,2]');
        expect(stringify([1, , 2])).toEqual('[1,,2]');
        expect(stringify([1, 2, ,])).toEqual('[1,2,,]');
        expect(stringify([1, 2, , ,])).toEqual('[1,2,,,]');
    });

    test('测试', () => {
        expect(stringify(Array(10000))).toEqual('Array(10000)');
        expect(stringify(Array(4294967295))).toEqual('Array(4294967295)');
        const sparseNonEmpty: any[] = Array(10000);
        sparseNonEmpty[150] = 5;
        sparseNonEmpty[21] = 1;
        sparseNonEmpty[200] = 10;
        expect(stringify(sparseNonEmpty)).toEqual(
            'Object.assign(Array(10000),{21:1,150:5,200:10})'
        );
        const sparseNonEmptyB: any[] = Array(4294967295);
        sparseNonEmptyB[1234567890] = 5;
        expect(stringify(sparseNonEmptyB)).toEqual(
            'Object.assign(Array(4294967295),{1234567890:5})'
        );
        const sparseNonEmptyC: any[] = Array(123456);
        sparseNonEmptyC[0] = 0;
        sparseNonEmptyC[1] = 1;
        expect(stringify(sparseNonEmptyC)).toEqual(
            'Object.assign(Array(123456),{0:0,1:1})'
        );
    });

    test('测试', () => {
        const cyclic: Set<any> = new Set([1, 2, 3]);
        cyclic.add(cyclic);
        cyclic.add(4);
        const repr = stringify(cyclic);
        expect(repr).toEqual('new Set([1,2,3,[cyclic],4])');
    });

    test('测试', () => {
        const cyclic: Map<any, any> = new Map();
        cyclic.set(1, 2);
        cyclic.set(3, cyclic);
        cyclic.set(cyclic, 4);
        cyclic.set(5, 6);
        const repr = stringify(cyclic);
        expect(repr).toEqual(
            'new Map([[1,2],[3,[cyclic]],[[cyclic],4],[5,6]])'
        );
    });

    test('测试', () => {
        expect(stringify(null)).toEqual('null');
        expect(stringify(undefined)).toEqual('undefined');
        expect(stringify(false)).toEqual('false');
        expect(stringify(42)).toEqual('42');
        expect(stringify(-0)).toEqual('-0');
        expect(stringify(Number.NaN)).toEqual('NaN');
        expect(stringify('Hello')).toEqual('"Hello"');
        if (typeof BigInt !== 'undefined') {
            expect(stringify(BigInt(42))).toEqual('42n');
        }
    });

    test('测试', () => {
        expect(stringify(new Boolean(false))).toEqual('new Boolean(false)');
        expect(stringify(new Number(42))).toEqual('new Number(42)');
        expect(stringify(new Number(-0))).toEqual('new Number(-0)');
        expect(stringify(new Number(Number.NaN))).toEqual('new Number(NaN)');
        expect(stringify(new String('Hello'))).toEqual('new String("Hello")');
    });

    test('测试', () => {
        expect(stringify(new Date(NaN))).toEqual('new Date(NaN)');
        expect(stringify(new Date('2014-25-23'))).toEqual('new Date(NaN)');
        expect(stringify(new Date('2019-05-23T22:19:06.049Z'))).toEqual(
            'new Date("2019-05-23T22:19:06.049Z")'
        );
    });

    test('测试', () => {
        expect(stringify(/\w+/)).toEqual('/\\w+/');
        expect(stringify(/^Hello(\d+)(\w*)$/gi)).toEqual(
            '/^Hello(\\d+)(\\w*)$/gi'
        );
        expect(stringify(new RegExp('\\w+'))).toEqual('/\\w+/');
    });

    test('测试', () => {
        expect(stringify(new Set([1, 2]))).toEqual('new Set([1,2])');
    });

    test('测试', () => {
        expect(stringify(new Map([[1, 2]]))).toEqual('new Map([[1,2]])');
    });

    test('测试', () => {
        expect(stringify(Symbol())).toEqual('Symbol()');
        expect(stringify(Symbol('fc'))).toEqual('Symbol("fc")');
        expect(stringify(Symbol.for('fc'))).toEqual('Symbol.for("fc")');
    });

    test('测试', () => {
        expect(stringify(Symbol.iterator)).toEqual('Symbol.iterator');
        expect(stringify(Symbol('Symbol.iterator'))).toEqual(
            'Symbol("Symbol.iterator")'
        );

        let foundOne = false;
        for (const symbolName of Object.getOwnPropertyNames(Symbol)) {
            const s = (Symbol as any)[symbolName];
            if (typeof s === 'symbol') {
                foundOne = true;
                expect(stringify(s)).toEqual(
                    symbolName === 'dispose' || symbolName === 'asyncDispose'
                        ? `Symbol.for("nodejs.${symbolName}")`
                        : `Symbol.${symbolName}`
                );
                expect(stringify(Symbol(`Symbol.${symbolName}`))).toEqual(
                    `Symbol("Symbol.${symbolName}")`
                );
                expect(
                    eval(`(function() { return typeof ${stringify(s)}; })()`)
                ).toBe('symbol');
            }
        }
        expect(foundOne).toBe(true);
    });

    test('测试', () => {
        expect(stringify({ a: 1 })).toEqual('{"a":1}');
        expect(stringify({ a: 1, b: 2 })).toEqual('{"a":1,"b":2}');
        expect(stringify({ [Symbol.for('a')]: 1 })).toEqual(
            '{[Symbol.for("a")]:1}'
        );
        expect(stringify({ a: 1, [Symbol.for('a')]: 1 })).toEqual(
            '{"a":1,[Symbol.for("a")]:1}'
        );
        expect(stringify({ [Symbol.for('a')]: 1, a: 1 })).toEqual(
            '{"a":1,[Symbol.for("a")]:1}'
        );
    });

    test('测试', () => {
        const obj: any = {};
        Object.defineProperties(obj, {
            a: { value: 1, enumerable: false },
            b: { value: 1, enumerable: true },
            [Symbol.for('a')]: { value: 1, enumerable: false },
            [Symbol.for('b')]: { value: 1, enumerable: true }
        });
        expect(stringify(obj)).toEqual('{"b":1,[Symbol.for("b")]:1}');
    });

    test('测试', () => {
        class A {
            public a: number;
            constructor() {
                this.a = 1;
                (this as any)[Symbol.for('a')] = 2;
            }
            public ma() {
                // no-op
            }
        }
        expect(stringify(new A())).toEqual('{"a":1,[Symbol.for("a")]:2}');

        class AA {
            public a = 0;
        }
        expect(stringify(new AA())).toEqual('{"a":0}');
    });

    test('测试', () => {
        class A {
            public a: number;
            constructor() {
                this.a = 1;
                (this as any)[Symbol.for('a')] = 2;
            }
            public ma() {
                // no-op
            }
        }
        class B extends A {
            public b;
            constructor() {
                super();
                this.b = 3;
                (this as any)[Symbol.for('b')] = 4;
            }
            public mb() {
                // no-op
            }
        }
        expect(stringify(new B())).toEqual(
            '{"a":1,"b":3,[Symbol.for("a")]:2,[Symbol.for("b")]:4}'
        );
    });

    test('测试', () => {
        expect(stringify(Object.create(null))).toEqual('Object.create(null)');
        expect(stringify(Object.assign(Object.create(null), { a: 1 }))).toEqual(
            'Object.assign(Object.create(null),{"a":1})'
        );
        expect(
            stringify(
                Object.assign(Object.create(null), { [Symbol.for('a')]: 1 })
            )
        ).toEqual('Object.assign(Object.create(null),{[Symbol.for("a")]:1})');
    });

    test('测试', () => {
        expect(stringify({ ['__proto__']: 1 })).toEqual('{["__proto__"]:1}');
        // NOTE: {__proto__: 1} and {'__proto__': 1} are not the same as {['__proto__']: 1}
    });

    test('测试', () => {
        const instance = Object.assign(Object.create(null), {
            ['__proto__']: 1
        });
        expect(stringify(instance)).toEqual(
            'Object.assign(Object.create(null),{["__proto__"]:1})'
        );
    });

    test('测试', () => {
        const p1 = Promise.resolve(1);
        const p2 = Promise.reject(1);
        const p3 = new Promise(() => {});

        expect(stringify(p1)).toEqual('new Promise(() => { /* unknown */ })');
        expect(stringify(p2)).toEqual('new Promise(() => { /* unknown */ })');
        expect(stringify(p3)).toEqual('new Promise(() => { /* unknown */ })');
        expect(stringify({ p1 })).toEqual(
            '{"p1":new Promise(() => { /* unknown */ })}'
        );

        [p1, p2, p3].map(p => p.catch(() => {}));
    });

    test('测试', () => {
        expect(stringify(Buffer.from([1, 2, 3, 4]))).toEqual(
            'Buffer.from([1,2,3,4])'
        );
        expect(stringify(Buffer.alloc(3))).toEqual('Buffer.from([0,0,0])');
        expect(stringify(Buffer.alloc(4, 'a'))).toEqual(
            'Buffer.from([97,97,97,97])'
        );
    });

    test('测试', () => {
        const buffer = NodeBuffer.from([1, 2, 3, 4]);
        expect(NodeBuffer).toBe(Buffer);
        expect(buffer instanceof NodeBuffer).toBe(true);
        expect(buffer instanceof Buffer).toBe(true);
        expect(stringify(buffer)).toEqual('Buffer.from([1,2,3,4])');
    });

    test('测试', () => {
        expect(stringify(Int8Array.from([-128, 5, 127]))).toEqual(
            'Int8Array.from([-128,5,127])'
        );
    });

    test('测试', () => {
        expect(stringify(Uint8Array.from([255, 0, 5, 127]))).toEqual(
            'Uint8Array.from([255,0,5,127])'
        );
    });

    test('测试', () => {
        expect(stringify(Int16Array.from([-32768, 5, 32767]))).toEqual(
            'Int16Array.from([-32768,5,32767])'
        );
    });

    test('测试', () => {
        expect(stringify(Uint16Array.from([65535, 0, 5, 32767]))).toEqual(
            'Uint16Array.from([65535,0,5,32767])'
        );
    });

    test('测试', () => {
        expect(
            stringify(Int32Array.from([-2147483648, 5, 2147483647]))
        ).toEqual('Int32Array.from([-2147483648,5,2147483647])');
    });

    test('测试', () => {
        expect(
            stringify(Uint32Array.from([4294967295, 0, 5, 2147483647]))
        ).toEqual('Uint32Array.from([4294967295,0,5,2147483647])');
    });

    test('测试', () => {
        expect(stringify(Float32Array.from([0, 0.5, 30, -1]))).toEqual(
            'Float32Array.from([0,0.5,30,-1])'
        );
    });

    test('测试', () => {
        expect(stringify(Float64Array.from([0, 0.5, 30, -1]))).toEqual(
            'Float64Array.from([0,0.5,30,-1])'
        );
    });

    if (typeof BigInt !== 'undefined') {
        test('测试', () => {
            expect(
                stringify(
                    BigInt64Array.from([
                        BigInt(-2147483648),
                        BigInt(5),
                        BigInt(2147483647)
                    ])
                )
            ).toEqual('BigInt64Array.from([-2147483648n,5n,2147483647n])');
        });
        test('测试', () => {
            expect(
                stringify(
                    BigUint64Array.from([
                        BigInt(0),
                        BigInt(5),
                        BigInt(2147483647)
                    ])
                )
            ).toEqual('BigUint64Array.from([0n,5n,2147483647n])');
        });
    }

    // test('测试', () => {
    //     expect(stringify(new ThrowingToString())).toEqual('[object Object]');
    //     expect(stringify(new CustomTagThrowingToString())).toEqual(
    //         '[object CustomTagThrowingToString]'
    //     );
    //     const instance = Object.create(null);
    //     Object.defineProperty(instance, 'toString', {
    //         get: () => {
    //             throw new Error('No such accessor');
    //         }
    //     });
    //     expect(stringify(instance)).toEqual('[object Object]');
    // });

    test('测试', () => {
        const instance1 = { [toStringMethod]: () => 'hello1' };
        expect(stringify(instance1)).toEqual('hello1');

        const instance2 = Object.create(null);
        Object.defineProperty(instance2, toStringMethod, {
            value: () => 'hello2',
            configurable: false,
            enumerable: false,
            writable: false
        });
        expect(stringify(instance2)).toEqual('hello2');

        const instance3 = {
            [toStringMethod]: () => {
                throw new Error('hello3');
            }
        };
        const stringified3 = stringify(instance3);
        expect(stringified3.replace(/[\s\n]+/g, ' ')).toEqual(
            '{[Symbol.for("__TO_STRING_METHOD__")]:() => { throw new Error(\'hello3\'); }}'
        );

        class InProto {
            [toStringMethod]() {
                return 'hello4';
            }
        }
        const instance4 = new InProto();
        expect(stringify(instance4)).toEqual('hello4');

        const instance5 = { [toStringMethod]: 1 };
        expect(stringify(instance5)).toEqual(
            '{[Symbol.for("__TO_STRING_METHOD__")]:1}'
        );
    });

    test('测试', () => {
        const instance1 = { [asyncToStringMethod]: () => 'hello1' };
        expect(stringify(instance1)).toEqual(
            '{[Symbol.for("__ASYNC_TO_STRING_METHOD__")]:() => \'hello1\'}'
        );

        const instance2 = {
            [asyncToStringMethod]: () => 'hello2',
            [toStringMethod]: () => 'world'
        };
        expect(stringify(instance2)).toEqual('world');
    });

    test('测试', async () => {
        const p = Promise.resolve(1);
        expect(await asyncStringify(p)).toEqual('Promise.resolve(1)');
    });

    test('测试', async () => {
        const p = Promise.reject(1);
        expect(await asyncStringify(p)).toEqual('Promise.reject(1)');
        p.catch(() => {});
    });

    test('测试', async () => {
        const p = Promise.reject(new Error('message'));
        expect(await asyncStringify(p)).toEqual(
            'Promise.reject(new Error("message"))'
        );
        p.catch(() => {});
    });
    test('测试', async () => {
        const p = new Promise(() => {});
        expect(await asyncStringify(p)).toEqual(
            'new Promise(() => { /* pending */ })'
        );
    });

    test('测试', async () => {
        const p1 = Promise.resolve(1);
        expect(await asyncStringify([p1])).toEqual('[Promise.resolve(1)]');
        expect(await asyncStringify(new Set([p1]))).toEqual(
            'new Set([Promise.resolve(1)])'
        );
        expect(await asyncStringify({ p1 })).toEqual(
            '{"p1":Promise.resolve(1)}'
        );
    });

    test('测试', async () => {
        const nestedPromises = Promise.resolve({
            lvl1: Promise.resolve({
                lvl2: Promise.resolve(2)
            })
        });
        expect(await asyncStringify(nestedPromises)).toEqual(
            'Promise.resolve({"lvl1":Promise.resolve({"lvl2":Promise.resolve(2)})})'
        );
    });

    test('测试', async () => {
        const resolvedValueChildLvl1 = {
            a1: Promise.resolve<unknown>(null)
        };
        const resolvedValue = {
            a: Promise.resolve(resolvedValueChildLvl1),
            b: { b1: Promise.resolve(resolvedValueChildLvl1) }
        };
        const nestedPromises = Promise.resolve(resolvedValue);
        resolvedValueChildLvl1.a1 = nestedPromises;
        expect(await asyncStringify(nestedPromises)).toEqual(
            'Promise.resolve({"a":Promise.resolve({"a1":[cyclic]}),"b":{"b1":Promise.resolve({"a1":[cyclic]})}})'
        );
    });

    test('测试', async () => {
        const instance1 = { [asyncToStringMethod]: async () => 'hello1' };
        expect(await asyncStringify(instance1)).toEqual('hello1');

        const instance2 = Object.create(null);
        Object.defineProperty(instance2, asyncToStringMethod, {
            value: () => 'hello2',
            configurable: false,
            enumerable: false,
            writable: false
        });
        expect(await asyncStringify(instance2)).toEqual('hello2');

        const instance3 = {
            [asyncToStringMethod]: async () => 'hello3',
            [toStringMethod]: () => 'world'
        };
        expect(await asyncStringify(instance3)).toEqual('hello3');

        const instance4 = {
            [asyncToStringMethod]: async () => {
                throw new Error('hello4');
            }
        };
        const stringified4 = await asyncStringify(instance4);
        expect(stringified4.replace(/[\s\n]+/g, ' ')).toEqual(
            '{[Symbol.for("__ASYNC_TO_STRING_METHOD__")]:async () => { throw new Error(\'hello4\'); }}'
        );

        const instance5 = {
            [asyncToStringMethod]: async () => {
                throw new Error('hello5');
            },
            [toStringMethod]: () => 'world'
        };
        expect(await asyncStringify(instance5)).toEqual('world');

        const instance6 = {
            [asyncToStringMethod]: () => {
                throw new Error('hello6');
            }
        };
        const stringified6 = await asyncStringify(instance6);
        expect(stringified6.replace(/[\s\n]+/g, ' ')).toEqual(
            '{[Symbol.for("__ASYNC_TO_STRING_METHOD__")]:() => { throw new Error(\'hello6\'); }}'
        );

        class InProto {
            async [asyncToStringMethod]() {
                return 'hello7';
            }
        }
        const instance7 = new InProto();
        expect(await asyncStringify(instance7)).toEqual('hello7');

        const instance8 = { [asyncToStringMethod]: 1 };
        expect(await asyncStringify(instance8)).toEqual(
            '{[Symbol.for("__ASYNC_TO_STRING_METHOD__")]:1}'
        );

        const instance9 = {
            [asyncToStringMethod]: async () => {
                const s1 = await asyncStringify(Promise.resolve('hello9'));
                const s2 = await asyncStringify(Promise.resolve('world9'));
                return `${s1} ${s2}`;
            }
        };
        expect(await asyncStringify(instance9)).toEqual(
            'Promise.resolve("hello9") Promise.resolve("world9")'
        );

        const p10 = Promise.resolve('hello10');
        const instance10 = {
            [asyncToStringMethod]: () => p10.then(v => `got: ${v}`)
        };
        expect(await asyncStringify(instance10)).toEqual('got: hello10');
    });
});
