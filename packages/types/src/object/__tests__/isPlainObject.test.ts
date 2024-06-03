import { isPlainObject } from '..';

describe('@curong/types/isPlainObject', () => {
    test('测试1', () => {
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(/\d+/)).toBe(false);
        expect(isPlainObject(12)).toBe(false);
        expect(isPlainObject(Number(12))).toBe(false);
    });

    test('测试2', () => {
        const A = Object.create(Object);
        const B = Object.create(A);
        const C = Object.create(null);

        expect(isPlainObject(A)).toBe(false);
        expect(isPlainObject(B)).toBe(false);
        expect(isPlainObject(C)).toBe(false);

        class Fn {}

        // `constructor` 是 `Fn`
        expect(isPlainObject(new Fn())).toBe(false);
    });

    test('测试2', () => {
        const obj = {};
        expect(isPlainObject(obj)).toBe(true);
    });
});
