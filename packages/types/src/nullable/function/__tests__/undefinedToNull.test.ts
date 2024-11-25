import { undefinedToNull } from '..';

describe('@curong/types/undefinedToNull', () => {
    test('测试1: 输入为 undefined，返回 null', () => {
        expect(undefinedToNull(undefined)).toBeNull();
    });

    test('测试2: 输入为 null，返回原值 null', () => {
        expect(undefinedToNull(null)).toBeNull();
    });

    test('测试3: 输入为非 undefined 的值，返回该值', () => {
        expect(undefinedToNull(123)).toBe(123);
        expect(undefinedToNull('test')).toBe('test');
        expect(undefinedToNull({})).toEqual({});
    });

    test('测试4: 输入为 undefined，返回 null，且不抛出异常', () => {
        expect(() => undefinedToNull(undefined)).not.toThrow();
    });

    test('测试5: 输入为非 undefined，返回原值，且不抛出异常', () => {
        expect(() => undefinedToNull(123)).not.toThrow();
        expect(() => undefinedToNull('test')).not.toThrow();
        expect(() => undefinedToNull({})).not.toThrow();
    });
});
