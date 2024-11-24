import { nullableOr } from '..';

describe('@curong/types/nullableOr', () => {
    test('测试1: 输入为 null，返回默认值', () => {
        expect(nullableOr(null, 'default')).toBe('default');
    });

    test('测试2: 输入为 undefined，返回默认值', () => {
        expect(nullableOr(undefined, 'default')).toBe('default');
    });

    test('测试3: 输入为非 null 或 undefined，返回原值', () => {
        expect(nullableOr('valid', 'default')).toBe('valid');
        expect(nullableOr(123, 'default')).toBe(123);
        expect(nullableOr(true, 'default')).toBe(true);
        expect(nullableOr([], 'default')).toEqual([]);
        expect(nullableOr({}, 'default')).toEqual({});
    });

    test('测试4: 输入为 null，返回默认值，默认值为 null', () => {
        expect(nullableOr(null, null)).toBe(null);
    });

    test('测试5: 输入为 undefined，返回默认值，默认值为 null', () => {
        expect(nullableOr(undefined, null)).toBe(null);
    });

    test('测试6: 输入为 null，返回默认值，默认值为 undefined', () => {
        expect(nullableOr(null, undefined)).toBe(undefined);
    });

    test('测试7: 输入为非 null 或 undefined，返回原值，默认值为 null', () => {
        expect(nullableOr('valid', null)).toBe('valid');
        expect(nullableOr(123, null)).toBe(123);
        expect(nullableOr(true, null)).toBe(true);
    });

    test('测试8: 输入为非 null 或 undefined，返回原值，默认值为 undefined', () => {
        expect(nullableOr('valid', undefined)).toBe('valid');
        expect(nullableOr(123, undefined)).toBe(123);
        expect(nullableOr(true, undefined)).toBe(true);
    });

    test('测试9: 输入为 null，返回默认值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(nullableOr(null, defaultValue)).toBe(defaultValue);
    });

    test('测试10: 输入为 undefined，返回默认值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(nullableOr(undefined, defaultValue)).toBe(defaultValue);
    });

    test('测试11: 输入为 null，返回默认值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(nullableOr(null, defaultValue)).toBe(defaultValue);
    });

    test('测试12: 输入为 undefined，返回默认值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(nullableOr(undefined, defaultValue)).toBe(defaultValue);
    });
});
