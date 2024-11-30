import { isPureObject } from '..';

describe('@curong/types/isPureObject', () => {
    test('测试1', () => {
        expect(isPureObject(null)).toBe(false);
        expect(isPureObject(/\d+/)).toBe(false);
        expect(isPureObject(12)).toBe(false);
        expect(isPureObject({})).toBe(false);
        expect(isPureObject(Object({}))).toBe(false);
        expect(isPureObject(Object.create({}))).toBe(false);
    });

    test('测试2', () => {
        const A = Object.create(Object);
        const B = Object.create(A);
        const C = Object.create(null);

        expect(isPureObject(A)).toBe(false);
        expect(isPureObject(B)).toBe(false);
        expect(isPureObject(C)).toBe(true);

        class Fn {}

        // `constructor` 是 `Fn`
        expect(isPureObject(new Fn())).toBe(false);
    });

    test('测试3', () => {
        const obj = Object.create(null);
        obj.constructor = 'xxx'; // 这里的是私有的，不是原型上的
        expect(isPureObject(obj)).toBe(true);
    });
});
