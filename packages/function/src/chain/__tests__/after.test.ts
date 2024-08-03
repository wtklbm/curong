import after from '../after';

describe('@curong/function/after', () => {
    test('测试1', () => {
        const add = (a: number, b: number) => a + b;
        const logAfter = () => console.log('结果:');
        const addWithLogging = after(logAfter);
        expect(addWithLogging(add, 1, 2)).toBe(3);
    });

    test('测试2', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => console.log('结果:');
        const f = after(afterFn);
        expect(f(add, 1, 2)).toBe(8);
    });

    test('测试3', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => {
            n = 3;
        };
        const f = after(afterFn);
        expect(f(add, 1, 2)).toBe(8);
    });

    test('测试4', () => {
        const add = (a: number, b: number) => a + b + n;
        const afterFn = () => {
            n = 3;
        };
        const f = after(afterFn);
        let n = 5;
        expect(f(add, 1, 2)).toBe(8);
    });

    test('测试5', () => {
        const add = (a: number, b: number) => a + b;
        const logAfter = (fnName: string) => console.log(`${fnName} 的结果:`);
        const addWithLogging = after(logAfter, add.name);
        expect(addWithLogging(add, 1, 2)).toBe(3);
    });
});
