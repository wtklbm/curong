import { isFunctionBound } from '../src';

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

        function greet(name: string) {
            console.log(`Hello, ${name}!`);
        }
        const boundGreet = greet.bind(null, 'Alice');
        expect(isFunctionBound(boundGreet)).toBe(true);
    });
});
