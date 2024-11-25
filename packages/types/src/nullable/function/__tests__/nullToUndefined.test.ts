import { nullToUndefined } from '..';

describe('@curong/types/nullToUndefined', () => {
    test('测试1: 输入为 null，返回 undefined', () => {
        expect(nullToUndefined(null)).toBeUndefined();
    });

    test('测试2: 输入为 undefined，返回该值', () => {
        expect(nullToUndefined(undefined)).toBeUndefined();
    });

    test('测试3: 输入为非 null 的值，返回该值', () => {
        expect(nullToUndefined(123)).toBe(123);
        expect(nullToUndefined('test')).toBe('test');
        expect(nullToUndefined({})).toEqual({});
    });

    test('测试4: 输入为 null，返回 undefined，且不抛出异常', () => {
        expect(() => nullToUndefined(null)).not.toThrow();
    });

    test('测试5: 输入为非 null，返回原值，且不抛出异常', () => {
        expect(() => nullToUndefined(123)).not.toThrow();
        expect(() => nullToUndefined('test')).not.toThrow();
    });
});
