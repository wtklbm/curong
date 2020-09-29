import { isPlainObject } from '../src';

describe('@curong/types/isPlainObject', () => {
    test('测试1', () => {
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(/\d+/)).toBe(false);
        expect(isPlainObject(12)).toBe(false);
    });

    test('测试2', () => {
        const A = Object.create(Object);
        const B = Object.create(A);
        expect(isPlainObject(A)).toBe(false);
        expect(isPlainObject(B)).toBe(false);
    });

    test('测试2', () => {
        const obj = {};
        expect(isPlainObject(obj)).toBe(true);
    });
});
