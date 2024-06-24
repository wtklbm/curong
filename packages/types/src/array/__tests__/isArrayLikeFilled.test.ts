import { isArrayLikeFilled } from '..';

describe('@curong/types/isArrayLikeFilled', () => {
    test('测试1', () => {
        expect(isArrayLikeFilled(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayLikeFilled([])).toBe(false);
        expect(isArrayLikeFilled([1])).toBe(false);
        const fn1 = (function () {
            expect(isArrayLikeFilled(arguments)).toBe(false);
        })();
    });

    test('测试3', () => {
        const fn2 = (function (a: any) {
            expect(isArrayLikeFilled(arguments)).toBe(true);
        })(0);
    });
});
