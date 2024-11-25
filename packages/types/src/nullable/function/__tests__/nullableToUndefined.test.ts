import { nullableToUndefined } from '..';

describe('@curong/types/nullableToUndefined', () => {
    test('测试1: 输入为 null，返回 undefined', () => {
        expect(nullableToUndefined(null)).toBeUndefined();
    });

    test('测试2: 输入为 undefined，返回 undefined', () => {
        expect(nullableToUndefined(undefined)).toBeUndefined();
    });

    test('测试3: 输入为非 null/undefined 的值，返回该值', () => {
        expect(nullableToUndefined(123)).toBe(123);
        expect(nullableToUndefined('test')).toBe('test');
        expect(nullableToUndefined({})).toEqual({});
    });

    test('测试4: 输入为一个空对象，返回该对象', () => {
        expect(nullableToUndefined({})).toEqual({});
    });

    test('测试5: 输入为 null，返回 undefined，且不抛出异常', () => {
        expect(() => nullableToUndefined(null)).not.toThrow();
    });

    test('测试6: 输入为 undefined，返回 undefined，且不抛出异常', () => {
        expect(() => nullableToUndefined(undefined)).not.toThrow();
    });

    test('测试7: 输入为非 null/undefined，返回原值且不抛出异常', () => {
        expect(() => nullableToUndefined(123)).not.toThrow();
        expect(() => nullableToUndefined('test')).not.toThrow();
    });
});
