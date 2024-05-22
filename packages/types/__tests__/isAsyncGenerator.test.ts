import { isAsyncGenerator } from '../src';

describe('@curong/types/isAsyncGenerator', () => {
    test('测试1', () => {
        expect(isAsyncGenerator(undefined)).toBeFalsy();
        expect(isAsyncGenerator(null)).toBeFalsy();
        expect(isAsyncGenerator(6)).toBeFalsy();
        expect(isAsyncGenerator(new Number(6.6))).toBeFalsy();
        expect(isAsyncGenerator('6')).toBeFalsy();
        expect(isAsyncGenerator(new String(6.6))).toBeFalsy();
        expect(isAsyncGenerator(Symbol(6))).toBeFalsy();
        expect(isAsyncGenerator({})).toBeFalsy();
        expect(isAsyncGenerator(new Object())).toBeFalsy();
        expect(isAsyncGenerator([])).toBeFalsy();
        expect(isAsyncGenerator(new Array(6))).toBeFalsy();
        expect(isAsyncGenerator(new RegExp('6'))).toBeFalsy();
        expect(isAsyncGenerator(new Map())).toBeFalsy();
        expect(isAsyncGenerator(new WeakMap())).toBeFalsy();
        expect(isAsyncGenerator(new Set())).toBeFalsy();
        expect(isAsyncGenerator(new WeakSet())).toBeFalsy();

        expect(isAsyncGenerator(console.log)).toBeFalsy();
        expect(isAsyncGenerator(new Function())).toBeFalsy();
        expect(isAsyncGenerator((function () {})())).toBeFalsy();
        expect(isAsyncGenerator((() => {})())).toBeFalsy();
        expect(isAsyncGenerator((async function () {})())).toBeFalsy();
        expect(isAsyncGenerator((async () => {})())).toBeFalsy();
    });

    test('测试2', () => {
        function* test1() {}
        expect(isAsyncGenerator(test1())).toBeFalsy();

        async function* test2() {}
        expect(isAsyncGenerator(test2())).toBeTruthy();
    });
});
