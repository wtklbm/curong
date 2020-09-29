import { isObject } from '../src';

describe('@curong/types/isObject', () => {
    test('测试1', () => {
        expect(isObject(12)).toBe(false);
        expect(isObject(undefined)).toBe(false);
    });

    test('测试2', () => {
        expect(isObject({})).toBe(true);
        expect(isObject(null)).toBe(false);
    });

    test('测试3', () => {
        const A = Object.create(Object);
        const B = Object.create(A);
        expect(isObject(A)).toBe(true);
        expect(isObject(B)).toBe(true);
    });
});
