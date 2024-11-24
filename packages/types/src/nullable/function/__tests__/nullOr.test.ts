import { nullOr } from '..';

describe('@curong/types/nullOr', () => {
    test('测试1: 输入为 null，返回默认值', () => {
        expect(nullOr(null, 'default')).toBe('default');
    });

    test('测试2: 输入为非 null 值，返回原值', () => {
        expect(nullOr('valid', 'default')).toBe('valid');
        expect(nullOr(123, 'default')).toBe(123);
        expect(nullOr(true, 'default')).toBe(true);
        expect(nullOr([], 'default')).toEqual([]);
        expect(nullOr({}, 'default')).toEqual({});
    });

    test('测试3: 输入为 null，返回默认值，默认值为 null', () => {
        expect(nullOr(null, null)).toBe(null);
    });

    test('测试4: 输入为非 null 值，返回原值，默认值为 null', () => {
        expect(nullOr('valid', null)).toBe('valid');
        expect(nullOr(123, null)).toBe(123);
        expect(nullOr(true, null)).toBe(true);
    });

    test('测试5: 输入为 null，返回默认值，默认值为 undefined', () => {
        expect(nullOr(null, undefined)).toBe(undefined);
    });

    test('测试6: 输入为非 null 值，返回原值，默认值为 undefined', () => {
        expect(nullOr('valid', undefined)).toBe('valid');
        expect(nullOr(123, undefined)).toBe(123);
        expect(nullOr(true, undefined)).toBe(true);
    });

    test('测试7: 输入为 null，返回默认值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(nullOr(null, defaultValue)).toBe(defaultValue);
    });

    test('测试8: 输入为非 null 值，返回原值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(nullOr('valid', defaultValue)).toBe('valid');
        expect(nullOr(123, defaultValue)).toBe(123);
        expect(nullOr(true, defaultValue)).toBe(true);
    });

    test('测试9: 输入为 null，返回默认值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(nullOr(null, defaultValue)).toBe(defaultValue);
    });

    test('测试10: 输入为非 null 值，返回原值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(nullOr('valid', defaultValue)).toBe('valid');
        expect(nullOr(123, defaultValue)).toBe(123);
        expect(nullOr(true, defaultValue)).toBe(true);
    });
});
