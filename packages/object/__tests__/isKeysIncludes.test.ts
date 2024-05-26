import { isKeysIncludes } from '../src';

// 用于测试的对象
const s = Symbol('yes');
const obj = { a: 1, b: 2, c: 3, [s]: 'yes' };

Object.defineProperty(obj, 'd', {
    value: 4,
    enumerable: false // 将属性设置为不可枚举
});

const proto = Object.getPrototypeOf(obj);

Object.defineProperty(proto, 'e', {
    value: 5
});

Object.defineProperty(proto, 'f', {
    value: 6,
    enumerable: false
});

describe('isKeysIncludes', () => {
    test('测试1', () => {
        expect(isKeysIncludes(obj, ['a', 'b', 'c'])).toBe(true);
        expect(isKeysIncludes(obj, ['a'], 0)).toBe(true);
        expect(isKeysIncludes(obj, ['a', 'b', 'c', 'd'], 1)).toBe(true);
        expect(isKeysIncludes(obj, [s], 2)).toBe(true);
        expect(isKeysIncludes(obj, ['a', s], 2, true)).toBe(true);
        expect(isKeysIncludes(obj, ['a', 'b', 'c', 'd', s], 3)).toBe(true);
    });

    test('测试2', () => {
        expect(isKeysIncludes(obj, 1)).toBe(false);
        expect(isKeysIncludes(obj, '1')).toBe(false);
        expect(isKeysIncludes(obj, ['1', 'd', 'e', 'f'])).toBe(false);
        expect(isKeysIncludes(obj, ['1', 'e', 'f'], 1)).toBe(false);
        expect(
            isKeysIncludes(obj, ['1', 'a', 'b', 'c', 'd', 'e', 'f'], 2)
        ).toBe(false);
        expect(isKeysIncludes(obj, ['1', 'e', 'f'], 3)).toBe(false);
    });

    test('测试3', () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(isKeysIncludes(obj, 'd')).toBe(false);
        expect(isKeysIncludes(obj, ['b', 'd'])).toBe(false);
        expect(isKeysIncludes(obj, ['b', 'd'], 0, true)).toBe(true);
    });

    test('测试4', () => {
        const arrayLikeObj = { 0: 'a', 1: 'b', length: 2 };
        expect(isKeysIncludes(arrayLikeObj, 2)).toBe(false);
        expect(isKeysIncludes(arrayLikeObj, '2')).toBe(false);
    });

    test('测试5', () => {
        const sym = Symbol('s');
        const obj = { a: 1, b: 2, c: 3, [sym]: 'yes' };
        expect(isKeysIncludes(obj, ['d', 'e'])).toBe(false);
        expect(isKeysIncludes(obj, ['d', 'e'], 0, true)).toBe(false);
        expect(isKeysIncludes(obj, sym)).toBe(false);
        expect(isKeysIncludes(obj, sym, 0)).toBe(false);
        expect(isKeysIncludes(obj, sym, 1)).toBe(false);
        expect(isKeysIncludes(obj, sym, 2)).toBe(true);
        expect(isKeysIncludes(obj, sym, 3)).toBe(true);
    });

    test('测试6', () => {
        const b = Symbol('2');
        const obj = { a: 1, [b]: '2' };
        expect(isKeysIncludes(obj, ['a', b])).toBe(false);
        expect(isKeysIncludes(obj, ['a', b], 3)).toBe(true);
        expect(isKeysIncludes(obj, ['a', 'c'])).toBe(false);
        expect(isKeysIncludes(obj, ['a', 'c'], true)).toBe(true);
        expect(isKeysIncludes(obj, ['a', b, 'c'])).toBe(false);
        expect(isKeysIncludes(obj, ['a', b, 'c'], 0)).toBe(false);
        expect(isKeysIncludes(obj, ['a', b, 'c'], 0, true)).toBe(true);
        expect(isKeysIncludes(obj, ['a', b, 'c'], 3)).toBe(false);
        expect(isKeysIncludes(obj, ['a', b, 'c'], 3, true)).toBe(true);
    });
});
