import { compose } from '..';

describe('@curong/function/compose', () => {
    test('测试1: 应正确组合两个函数', () => {
        const add = (a: number) => a + 1;
        const multiply = (b: number) => b * 2;
        const pipedFunc = compose(add, multiply);

        expect(pipedFunc(2)).toBe(6); // (2 + 1) * 2 = 6
    });

    test('测试2: 应正确组合三个函数', () => {
        const add = (a: number) => a + 1;
        const multiply = (b: number) => b * 2;
        const subtract = (c: number) => c - 3;
        const pipedFunc = compose(add, multiply, subtract);

        expect(pipedFunc(2)).toBe(3); // ((2 + 1) * 2) - 3 = 3
    });

    test('测试3: 应正确组合五个函数', () => {
        const add = (a: number) => a + 1;
        const multiply = (b: number) => b * 2;
        const subtract = (c: number) => c - 3;
        const divide = (d: number) => d / 2;
        const square = (e: number) => e * e;
        const pipedFunc = compose(add, multiply, subtract, divide, square);

        expect(pipedFunc(2)).toBe(2.25);
    });

    test('测试4: 应正确处理字符串', () => {
        const trim = (s: string) => s.trim();
        const toUpperCase = (s: string) => s.toUpperCase();
        const exclaim = (s: string) => `${s}!`;
        const pipedFunc = compose(trim, toUpperCase, exclaim);

        expect(pipedFunc(' hello ')).toBe('HELLO!');
    });

    test('测试5: 应正确处理数组', () => {
        const addOne = (arr: number[]) => arr.map(n => n + 1);
        const filterEven = (arr: number[]) => arr.filter(n => n % 2 === 0);
        const sum = (arr: number[]) => arr.reduce((acc, n) => acc + n, 0);
        const pipedFunc = compose(addOne, filterEven, sum);

        expect(pipedFunc([1, 2, 3, 4])).toBe(6);
    });

    test('测试6: 当不传递函数时应返回输入', () => {
        // @ts-ignore
        const pipedFunc = compose();
        expect(pipedFunc(5)).toBe(5);
    });

    test('测试7: 应正确处理函数内部的异常', () => {
        const add = (a: number) => a + 1;
        const throwError = () => {
            throw new Error('Test Error');
        };
        const multiply = (b: number) => b * 2;
        const pipedFunc = compose(add, throwError, multiply);

        expect(() => pipedFunc(2)).toThrow('Test Error');
    });
});
