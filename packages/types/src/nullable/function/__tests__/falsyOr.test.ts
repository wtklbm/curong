import { falsyOr } from '..';

describe('@curong/types/falsyOr', () => {
    test('测试1: 输入为 falsy 值，返回默认值', () => {
        expect(falsyOr(null, 'default')).toBe('default');
        expect(falsyOr(undefined, 'default')).toBe('default');
        expect(falsyOr(false, 'default')).toBe('default');
        expect(falsyOr(0, 'default')).toBe('default');
        expect(falsyOr(NaN, 'default')).toBe('default');
    });

    test('测试2: 输入为非 falsy 值，返回原值', () => {
        expect(falsyOr('valid', 'default')).toBe('valid');
        expect(falsyOr(123, 'default')).toBe(123);
        expect(falsyOr(true, 'default')).toBe(true);
        expect(falsyOr([], 'default')).toEqual([]);
        expect(falsyOr({}, 'default')).toEqual({});
    });

    test('测试3: 输入为 falsy 值，返回默认值，默认值为 null', () => {
        expect(falsyOr(null, null)).toBe(null);
        expect(falsyOr(undefined, null)).toBe(null);
        expect(falsyOr(0, null)).toBe(null);
        expect(falsyOr(false, null)).toBe(null);
        expect(falsyOr(NaN, null)).toBe(null);
    });

    test('测试4: 输入为 falsy 值，返回默认值，默认值为 undefined', () => {
        expect(falsyOr(null, undefined)).toBe(undefined);
        expect(falsyOr(undefined, undefined)).toBe(undefined);
        expect(falsyOr(0, undefined)).toBe(undefined);
        expect(falsyOr(false, undefined)).toBe(undefined);
        expect(falsyOr(NaN, undefined)).toBe(undefined);
    });

    test('测试5: 输入为 falsy 值，返回默认值，默认值为数字', () => {
        expect(falsyOr(null, 123)).toBe(123);
        expect(falsyOr(undefined, 123)).toBe(123);
        expect(falsyOr(0, 123)).toBe(123);
        expect(falsyOr(false, 123)).toBe(123);
        expect(falsyOr(NaN, 123)).toBe(123);
    });

    test('测试6: 输入为 falsy 值，返回默认值，默认值为布尔值', () => {
        expect(falsyOr(null, true)).toBe(true);
        expect(falsyOr(undefined, true)).toBe(true);
        expect(falsyOr(0, true)).toBe(true);
        expect(falsyOr(false, true)).toBe(true);
        expect(falsyOr(NaN, true)).toBe(true);
    });

    test('测试7: 输入为 falsy 值，返回默认值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(falsyOr(null, defaultValue)).toBe(defaultValue);
        expect(falsyOr(undefined, defaultValue)).toBe(defaultValue);
        expect(falsyOr(0, defaultValue)).toBe(defaultValue);
        expect(falsyOr(false, defaultValue)).toBe(defaultValue);
        expect(falsyOr(NaN, defaultValue)).toBe(defaultValue);
    });

    test('测试8: 输入为 falsy 值，返回默认值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(falsyOr(null, defaultValue)).toBe(defaultValue);
        expect(falsyOr(undefined, defaultValue)).toBe(defaultValue);
        expect(falsyOr(0, defaultValue)).toBe(defaultValue);
        expect(falsyOr(false, defaultValue)).toBe(defaultValue);
        expect(falsyOr(NaN, defaultValue)).toBe(defaultValue);
    });
});
