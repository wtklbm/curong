import { isArrayLike } from '../src';

describe('@curong/types/isArrayLike', () => {
    test('测试1', () => {
        expect(isArrayLike(null)).toBe(false);
        expect(isArrayLike(undefined)).toBe(false);
        expect(isArrayLike(function a() {})).toBe(false);
        expect(isArrayLike([])).toBe(false);
        expect(isArrayLike({})).toBe(false);
        expect(isArrayLike(0)).toBe(false);
    });

    test('测试2', () => {
        function fn1() {
            expect(isArrayLike(arguments)).toBe(true);
        }

        fn1();

        function fn2(a: number) {
            expect(isArrayLike(arguments)).toBe(true);
        }

        fn2(0);
    });
});
