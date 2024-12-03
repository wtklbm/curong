import { clearObject } from '..';

describe('@curong/utils/clearObject', () => {
    test('测试1: 使用 Object.keys 清空对象的可枚举属性，返回 true', () => {
        const obj = { a: 1, b: 2 };
        const result = clearObject(obj);
        expect(result).toBe(true);
        expect(obj).toEqual({});
    });

    test('测试2: 使用 Object.getOwnPropertyNames 清空对象的所有属性，返回 true', () => {
        const obj = Object.create(null, {
            a: { value: 1, enumerable: true, configurable: true },
            b: { value: 2, enumerable: false, configurable: true }
        });
        const result = clearObject(obj, 1);
        expect(result).toBe(true);
        expect(obj).toEqual({});
    });

    test('测试3: 使用 Object.getOwnPropertySymbols 清空对象的 Symbol 属性，返回 true', () => {
        const sym1 = Symbol('sym1');
        const sym2 = Symbol('sym2');
        const obj = { [sym1]: 1, [sym2]: 2 };
        const result = clearObject(obj, 2);
        expect(result).toBe(true);
        expect(Object.getOwnPropertySymbols(obj)).toHaveLength(0);
    });

    test('测试4: 使用 Reflect.ownKeys 清空对象的所有属性，包括 Symbol，返回 true', () => {
        const sym1 = Symbol('sym1');
        const obj = { a: 1, [sym1]: 2 };
        const result = clearObject(obj, 3);
        expect(result).toBe(true);
        expect(Reflect.ownKeys(obj)).toHaveLength(0);
    });

    test('测试5: 对象包含不可配置属性，返回 false', () => {
        const obj = Object.create(null, {
            a: { value: 1, enumerable: true, configurable: true },
            b: { value: 2, enumerable: true, configurable: false }
        });
        const result = clearObject(obj, 1);
        expect(result).toBe(false);
        expect(obj).not.toHaveProperty('a');
        expect(obj).toHaveProperty('b');
    });

    test('测试6: 清空空对象，返回 true', () => {
        const obj = {};
        const result = clearObject(obj, 0);
        expect(result).toBe(true);
        expect(obj).toEqual({});
    });

    test('测试7: 清空类数组对象的属性，返回 true', () => {
        const obj = { 0: 'a', 1: 'b', length: 2 };
        const result = clearObject(obj, 0);
        expect(result).toBe(true);
        expect(obj).toEqual({});
    });

    test('测试8: 传入空对象使用不同方法级别，始终返回 true', () => {
        const obj = {};
        expect(clearObject(obj, 0)).toBe(true);
        expect(clearObject(obj, 1)).toBe(true);
        expect(clearObject(obj, 2)).toBe(true);
        expect(clearObject(obj, 3)).toBe(true);
    });

    test('测试9: 对象包含不可枚举属性，清空时返回 true', () => {
        const obj = {};
        Object.defineProperty(obj, 'hidden', {
            value: 42,
            enumerable: false,
            configurable: true
        });
        const result = clearObject(obj, 1);
        expect(result).toBe(true);
        expect(obj).toEqual({});
    });
});
