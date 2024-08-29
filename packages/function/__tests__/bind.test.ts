// @ts-nocheck

import { bind } from '../src';

describe('@curong/function/bind', () => {
    test('测试1: 应正确绑定函数到对象上', () => {
        const obj = {
            x: 42,
            getX: function () {
                return this.x;
            }
        };

        const getX = bind(obj.getX, obj);
        expect(getX()).toBe(42);
    });

    test('测试2: 应正确绑定箭头函数', () => {
        const obj = {
            x: 42,
            // @ts-ignore
            getX: () => this.x
        };

        const getX = bind(obj.getX, obj);
        expect(getX()).toBeUndefined(); // 箭头函数无法绑定上下文，返回 undefined
    });

    test('测试3: 应正确绑定函数并传递参数', () => {
        function add(a: number, b: number) {
            return this.base + a + b;
        }

        const boundAdd = bind(add, { base: 10 });
        expect(boundAdd(2, 3)).toBe(15); // 10 + 2 + 3 = 15
    });

    test('测试4: 应正确绑定函数并保持参数传递顺序', () => {
        function concat(a: string, b: string, c: string) {
            return this.prefix + a + b + c + this.suffix;
        }

        const boundConcat = bind(concat, { prefix: '[', suffix: ']' });
        expect(boundConcat('a', 'b', 'c')).toBe('[abc]');
    });

    test('测试5: 应正确绑定函数并处理可变参数', () => {
        function sum(...args: number[]) {
            return this.base + args.reduce((acc, val) => acc + val, 0);
        }

        const boundSum = bind(sum, { base: 100 });
        expect(boundSum(1, 2, 3, 4)).toBe(110); // 100 + 1 + 2 + 3 + 4 = 110
    });

    test('测试6: 应正确处理绑定函数的返回值', () => {
        function getValue() {
            return this.value;
        }

        const boundGetValue = bind(getValue, { value: 'Hello' });
        expect(boundGetValue()).toBe('Hello');
    });

    test('测试7: 应正确处理绑定函数中的异常', () => {
        function throwError() {
            throw new Error('Test Error');
        }

        const boundThrowError = bind(throwError, {});
        expect(() => boundThrowError()).toThrow('Test Error');
    });

    test('测试8: 测试数组', () => {
        const o = { a: 1, b: 2 };
        const f = bind(Object.prototype.hasOwnProperty, o);
        expect([f('a'), f('b'), f('c')]).toEqual([true, true, false]);
    });
});
