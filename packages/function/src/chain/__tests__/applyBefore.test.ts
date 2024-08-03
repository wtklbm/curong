import applyBefore from '../applyBefore';

describe('@curong/function/applyBefore', () => {
    test('测试1', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const then = (result: number) => result;
        const f = applyBefore(add);
        expect(f(then, 1, 2)).toBe(8);
    });

    test('测试2', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const then = (result: number) => {
            n = 3;
            return result;
        };
        const f = applyBefore(add);
        expect(f(then, 1, 2)).toBe(8);
    });

    test('测试3', () => {
        const add = (a: number, b: number) => a + b + n;
        const then = (result: number) => {
            n = 3;
            return result;
        };
        const f = applyBefore(add);
        let n = 5;
        expect(f(then, 1, 2)).toBe(8);
    });
});
