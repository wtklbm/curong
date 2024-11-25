import { nullableToNull } from '..';

describe('@curong/types/nullableToNull', () => {
    test('测试1: 输入为 null，返回 null', () => {
        expect(nullableToNull(null)).toBeNull();
    });

    test('测试2: 输入为 undefined，返回 null', () => {
        expect(nullableToNull(undefined)).toBeNull();
    });

    test('测试3: 输入为非 null 或 undefined 值，返回原值', () => {
        expect(nullableToNull(123)).toBe(123);
        expect(nullableToNull('test')).toBe('test');
        expect(nullableToNull(true)).toBe(true);
        expect(nullableToNull({})).toEqual({});
    });

    test('测试4: 输入为 null，isNullToUndefined 返回 false，应该仍然返回 null', () => {
        expect(nullableToNull(null)).toBeNull();
    });

    test('测试5: 输入为 undefined，isNullToUndefined 返回 false，应该仍然返回 null', () => {
        expect(nullableToNull(undefined)).toBeNull();
    });
});
