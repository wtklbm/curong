import withBefore from '../withBefore';

describe('@curong/function/withBefore', () => {
    test('测试1', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const callback = (result: number) => result + '';
        const f = withBefore(add);
        expect(f(callback, 1, 2)).toBe(8);
    });

    test('测试2', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const callback = (result: number) => {
            n = n * result;
        };
        const f = withBefore(add);
        expect(f(callback, 1, 2)).toBe(8);
        expect(n).toBe(40);
    });

    test('测试3', () => {
        const add = (a: number, b: number) => a + b + n;
        const callback = (result: number) => {
            if (result < 0) {
                throw new EvalError('值太小了');
            }
        };
        const f = withBefore(add);
        let n = 5;
        expect(f(callback, 1, 2)).toBe(8);
    });
});
