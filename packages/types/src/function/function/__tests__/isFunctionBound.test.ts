import { isFunctionBound } from '..';

describe('@curong/types/isFunctionBound', () => {
    test('测试1', () => {
        expect(isFunctionBound(12)).toBe(false);
        expect(isFunctionBound([1])).toBe(false);
        expect(isFunctionBound(new Function())).toBe(false);
        expect(isFunctionBound(function a() {})).toBe(false);
        expect(isFunctionBound(async function a() {})).toBe(false);
        expect(isFunctionBound(function A() {})).toBe(false);
        expect(isFunctionBound(async function A() {})).toBe(false);
        expect(isFunctionBound(() => {})).toBe(false);
        expect(isFunctionBound(async () => {})).toBe(false);
    });

    test('测试2', () => {
        const fn1 = () => {};
        const fn2 = fn1.bind(null);
        expect(isFunctionBound(fn1)).toBe(false);
        expect(isFunctionBound(fn2)).toBe(true);

        const fn3 = function () {};
        const fn4 = fn3.bind(null);
        expect(isFunctionBound(fn3)).toBe(false);
        expect(isFunctionBound(fn4)).toBe(true);
    });

    test('测试3', () => {
        const fn1 = async () => {};
        const fn2 = fn1.bind(null);
        expect(isFunctionBound(fn1)).toBe(false);
        expect(isFunctionBound(fn2)).toBe(true);

        const fn3 = async function () {};
        const fn4 = fn3.bind(null);
        expect(isFunctionBound(fn3)).toBe(false);
        expect(isFunctionBound(fn4)).toBe(true);
    });

    test('测试4', () => {
        const fn1 = function* () {};
        const fn2 = fn1.bind(null);
        expect(isFunctionBound(fn1)).toBe(false);
        expect(isFunctionBound(fn2)).toBe(true);

        const fn3 = async function* () {};
        const fn4 = fn3.bind(null);
        expect(isFunctionBound(fn3)).toBe(false);
        expect(isFunctionBound(fn4)).toBe(true);
    });

    test('测试5', () => {
        function greet(name: string) {
            console.log(`Hello, ${name}!`);
        }
        const boundGreet = greet.bind(null, 'Alice');
        expect(isFunctionBound(boundGreet)).toBe(true);
    });

    test('测试6', () => {
        function greet(name: string) {
            console.log(`Hello, ${name}!`);
        }

        greet.toString = () => 'toString';
        const boundGreet = greet.bind(null, 'Alice');
        expect(isFunctionBound(boundGreet)).toBe(true);
    });

    test('测试7', () => {
        const s = {
            name: 's'
        };
        // @ts-ignore
        const f = () => console.log(this.name);
        const n = f.bind(s);
        expect(isFunctionBound(n)).toBe(true);
        expect(n()).toBe(undefined);
    });
});
