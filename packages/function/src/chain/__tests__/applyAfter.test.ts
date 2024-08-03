import applyAfter from '../applyAfter';

describe('@curong/function/applyAfter', () => {
    test('测试1', () => {
        const add = (a: number, b: number) => a + b;
        const f = applyAfter((data: number) => console.log(`结果: ${data}`));
        expect(f(add, 1, 2)).toBe(undefined);
    });

    test('测试2', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => console.log('结果:');
        const f = applyAfter(afterFn);
        expect(f(add, 1, 2)).toBe(undefined);
    });

    test('测试3', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => {
            n = 3;
        };
        const f = applyAfter(afterFn);
        expect(f(add, 1, 2)).toBe(undefined);
    });

    test('测试4', () => {
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => {
            n = 3;
        };
        const f = applyAfter(afterFn);
        let n = 5;
        expect(f(add, 1, 2)).toBe(undefined);
    });
});
