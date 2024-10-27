// @ts-nocheck

import { isArrowFunction } from '..';

describe('@curong/types/isArrowFunction', () => {
    test('测试1', () => {
        const nonFuncs = [
            true,
            false,
            null,
            undefined,
            {},
            [],
            /a/g,
            'string',
            42,
            new Date()
        ];

        expect(nonFuncs.every(v => !isArrowFunction(v))).toBe(true);
    });

    test('测试2', () => {
        expect(isArrowFunction(function () {})).toBe(false);
        expect(isArrowFunction(function a() {})).toBe(false);
        expect(isArrowFunction(function foo() {})).toBe(false);
        expect(isArrowFunction(async function () {})).toBe(false);
        expect(isArrowFunction(async function a() {})).toBe(false);
        expect(isArrowFunction(async function foo() {})).toBe(false);

        const afs = [
            'return function(){}',
            'return function(a){}',
            'return function foo(){}',
            'return function foo(a){}',
            'return async function(){}',
            'return async function(a){}',
            'return async function foo(){}',
            'return async function foo(a){}'
        ];

        expect(afs.every(f => !isArrowFunction(Function(f)()))).toBe(true);
    });

    test('测试3', () => {
        // 带有参数
        expect(isArrowFunction(a => {})).toBe(true);
        expect(isArrowFunction(abc12 => {})).toBe(true);
        expect(isArrowFunction((a: any) => {})).toBe(true);
        expect(isArrowFunction((a123_b$: any) => {})).toBe(true);
        expect(isArrowFunction((a: any, b: any) => {})).toBe(true);
        expect(isArrowFunction((a: any, b: any, c: any) => {})).toBe(true);

        // 参数带有默认值
        expect(isArrowFunction((a = Math.floor(10.12)) => {})).toBe(true);
        expect(isArrowFunction((a = {}) => {})).toBe(true);
        expect(isArrowFunction((a = 1) => {})).toBe(true);
        expect(isArrowFunction((a = function () {}) => {})).toBe(true);
        expect(isArrowFunction((a = () => {}) => {})).toBe(true);
        expect(isArrowFunction((a = (a: any, b: any) => {}) => {})).toBe(true);
    });

    test('测试4', () => {
        // 带有参数
        expect(isArrowFunction(async a => {})).toBe(true);
        expect(isArrowFunction(async abc12 => {})).toBe(true);
        expect(isArrowFunction(async (a: any) => {})).toBe(true);
        expect(isArrowFunction(async (a123_b$: any) => {})).toBe(true);
        expect(isArrowFunction(async (a: any, b: any) => {})).toBe(true);
        expect(isArrowFunction(async (a: any, b: any, c: any) => {})).toBe(
            true
        );

        // 参数带有默认值
        expect(isArrowFunction(async (a = Math.floor(10.12)) => {})).toBe(true);
        expect(isArrowFunction(async (a = {}) => {})).toBe(true);
        expect(isArrowFunction(async (a = 1) => {})).toBe(true);
        expect(isArrowFunction(async (a = function () {}) => {})).toBe(true);
        expect(isArrowFunction(async (a = () => {}) => {})).toBe(true);
        expect(isArrowFunction(async (a = (a: any, b: any) => {}) => {})).toBe(
            true
        );
    });

    test('测试4', () => {
        const afs = [
            'return (a, b) => a * b;',
            'return () => 42;',
            'return () => function () {};',
            'return () => x => x * x;',
            'return y => x => x * x;',
            'return x => x * x;',
            'return x => { return x * x; }',
            'return (x, y) => { return x + x; }',
            '"use strict"; return (a = Math.random(10)) => {};',
            '"use strict"; return (a = function() {\n\tif (Math.random() < 0.5) { return 42; }\n\treturn "something else";\n}) => a();'
        ];

        expect(afs.every(f => isArrowFunction(Function(f)()))).toBe(true);
    });

    test('测试5', () => {
        const func = function () {};
        func.toString = function () {
            return 'ARROW';
        };
        expect(isArrowFunction(func)).toBe(false);
    });

    test('测试6', () => {
        const x = {
            foo() {
                return 42;
            },
            bar() {
                return (() => 10)();
            },
            buz() {
                return 123;
            }
        };
        expect(isArrowFunction(x.foo)).toBe(false);
        expect(isArrowFunction(x.bar)).toBe(false);
        expect(isArrowFunction(x.buz)).toBe(false);
    });
});
