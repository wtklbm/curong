import withAfter from '../withAfter';

describe('@curong/function/withAfter', () => {
    test('测试1', () => {
        const add = (a: number, b: number) => a + b;
        const callback = (data: number) => console.log(`结果: ${data}`);
        const f = withAfter(callback);
        expect(f(add, 1, 2)).toBe(3);
    });

    test('测试2', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const callback = (data: number) => data.toString();
        const f = withAfter(callback);
        expect(f(add, 1, 2)).toBe(8);
    });

    test('测试3', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const callback = (data: number) => {
            n = n * data;
        };
        const f = withAfter(callback);
        expect(f(add, 1, 2)).toBe(8);
        expect(n).toBe(40);
    });

    test('测试4', () => {
        const add = (a: number, b: number) => a + b + n;
        const callback = (data: number) => {
            if (data < 0) {
                throw new EvalError('值太小了');
            }
        };
        const f = withAfter(callback);
        let n = 5;
        expect(f(add, 1, 2)).toBe(8);
    });
});
