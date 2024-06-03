import { isArrayLikeHave } from '..';

describe('@curong/types/isArrayLikeHave', () => {
    test('测试1', () => {
        expect(isArrayLikeHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isArrayLikeHave([])).toBe(false);
        expect(isArrayLikeHave([1])).toBe(false);
        const fn1 = (function () {
            expect(isArrayLikeHave(arguments)).toBe(false);
        })();
    });

    test('测试3', () => {
        const fn2 = (function (a: any) {
            expect(isArrayLikeHave(arguments)).toBe(true);
        })(0);
    });
});
