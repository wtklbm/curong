// @ts-nocheck

import { isPrototypeOf } from '..';

describe('@curong/types/isPrototypeOf', () => {
    // 创建一个简单的原型链
    class Parent {}
    class Child extends Parent {}

    const parent = new Parent();
    const child = new Child();

    test('测试正常情况', () => {
        expect(isPrototypeOf(Parent.prototype, child)).toBe(true);
        expect(isPrototypeOf(Object.prototype, child)).toBe(true);
        expect(isPrototypeOf(Child.prototype, parent)).toBe(false);
    });

    test('测试异常情况', () => {
        expect(isPrototypeOf(null, child)).toBe(false);
        expect(isPrototypeOf(undefined, child)).toBe(false);
        expect(isPrototypeOf(Parent.prototype, null)).toBe(false);
        expect(isPrototypeOf(Parent.prototype, undefined)).toBe(false);
    });

    test('测试性能', () => {
        const iterations = 1000000; // 一百万次迭代

        const start = process.hrtime();
        for (let i = 0; i < iterations; i++) {
            isPrototypeOf(Parent.prototype, child);
        }
        const end = process.hrtime(start);

        const duration = end[0] * 1000 + end[1] / 1000000; // 转换为毫秒
        console.log(
            `执行 ${iterations} 次 isPrototypeOf 函数耗时: ${duration.toFixed(4)} 毫秒`
        );
    });
});
