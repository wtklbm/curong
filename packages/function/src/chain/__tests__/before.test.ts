import before from '../before';

describe('@curong/function/before', () => {
    test('测试1', () => {
        const logBefore = () => console.log('结果:');
        const add = (a: number, b: number) => a + b;
        const addWithLogging = before(logBefore);
        expect(addWithLogging(add, 1, 2)).toBe(3);
    });

    test('测试2', () => {
        const n = 5;
        const add = (a: number, b: number) => a + b + n;
        const beforeFn = () => console.log('结果:');
        const f = before(beforeFn);
        expect(f(add, 1, 2)).toBe(8);
    });

    test('测试3', () => {
        let n = 5;
        const add = (a: number, b: number) => a + b + n;
        const beforeFn = () => {
            n = 3;
        };
        const f = before(beforeFn);
        expect(f(add, 1, 2)).toBe(6);
    });

    test('测试4', () => {
        const add = (a: number, b: number) => a + b + n;
        const beforeFn = () => {
            n = 3;
        };
        const f = before(beforeFn);
        let n = 5;
        expect(f(add, 1, 2)).toBe(6);
    });

    test('测试5', () => {
        const logBefore = (fnName: string) => console.log(`${fnName} 的结果:`);
        const add = (a: number, b: number) => a + b;
        const addWithLogging = before(logBefore, add.name);
        expect(addWithLogging(add, 1, 2)).toBe(3);
    });
});
