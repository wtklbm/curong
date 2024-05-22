import { isAsyncGeneratorFunction } from '../src';

describe('@curong/types/isAsyncGeneratorFunction', () => {
    test('测试1', () => {
        expect(isAsyncGeneratorFunction(new Function())).toBeFalsy();

        function fn1() {}
        expect(isAsyncGeneratorFunction(fn1())).toBeFalsy();

        async function fn2() {}
        expect(isAsyncGeneratorFunction(fn2())).toBeFalsy();

        expect(isAsyncGeneratorFunction(undefined)).toBeFalsy();
        expect(isAsyncGeneratorFunction(null)).toBeFalsy();
        expect(isAsyncGeneratorFunction(6)).toBeFalsy();
        expect(isAsyncGeneratorFunction(new Number(6.6))).toBeFalsy();
        expect(isAsyncGeneratorFunction('6')).toBeFalsy();
        expect(isAsyncGeneratorFunction(new String(6.6))).toBeFalsy();
        expect(isAsyncGeneratorFunction(Symbol(6))).toBeFalsy();
        expect(isAsyncGeneratorFunction({})).toBeFalsy();
        expect(isAsyncGeneratorFunction(new Object())).toBeFalsy();
        expect(isAsyncGeneratorFunction([])).toBeFalsy();
        expect(isAsyncGeneratorFunction(new Array(6))).toBeFalsy();
        expect(isAsyncGeneratorFunction(new RegExp('6'))).toBeFalsy();
        expect(isAsyncGeneratorFunction(new Map())).toBeFalsy();
        expect(isAsyncGeneratorFunction(new WeakMap())).toBeFalsy();
        expect(isAsyncGeneratorFunction(new Set())).toBeFalsy();
        expect(isAsyncGeneratorFunction(new WeakSet())).toBeFalsy();
        expect(isAsyncGeneratorFunction(async function () {})).toBeFalsy();
        expect(isAsyncGeneratorFunction(async () => {})).toBeFalsy();
        expect(isAsyncGeneratorFunction(console.log)).toBeFalsy();
        expect(isAsyncGeneratorFunction(function () {})).toBeFalsy();
        expect(isAsyncGeneratorFunction(() => {})).toBeFalsy();
        expect(isAsyncGeneratorFunction(function* () {})).toBeFalsy();
    });

    test('测试2', () => {
        function* test1() {}
        expect(isAsyncGeneratorFunction(test1())).toBeFalsy();

        async function* test2() {}
        expect(isAsyncGeneratorFunction(test2())).toBeTruthy();
    });
});
