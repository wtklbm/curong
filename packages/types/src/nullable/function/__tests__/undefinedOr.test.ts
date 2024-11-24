import { undefinedOr } from '..';

describe('@curong/types/undefinedOr', () => {
    test('测试1: 输入为 undefined，返回默认值', () => {
        expect(undefinedOr(undefined, 'default')).toBe('default');
    });

    test('测试2: 输入为非 undefined 值，返回原值', () => {
        expect(undefinedOr('valid', 'default')).toBe('valid');
        expect(undefinedOr(123, 'default')).toBe(123);
        expect(undefinedOr(true, 'default')).toBe(true);
        expect(undefinedOr([], 'default')).toEqual([]);
        expect(undefinedOr({}, 'default')).toEqual({});
    });

    test('测试3: 输入为 undefined，返回默认值，默认值为 null', () => {
        expect(undefinedOr(undefined, null)).toBe(null);
    });

    test('测试4: 输入为非 undefined 值，返回原值，默认值为 null', () => {
        expect(undefinedOr('valid', null)).toBe('valid');
        expect(undefinedOr(123, null)).toBe(123);
        expect(undefinedOr(true, null)).toBe(true);
    });

    test('测试5: 输入为 undefined，返回默认值，默认值为 undefined', () => {
        expect(undefinedOr(undefined, undefined)).toBe(undefined);
    });

    test('测试6: 输入为非 undefined 值，返回原值，默认值为 undefined', () => {
        expect(undefinedOr('valid', undefined)).toBe('valid');
        expect(undefinedOr(123, undefined)).toBe(123);
        expect(undefinedOr(true, undefined)).toBe(true);
    });

    test('测试7: 输入为 undefined，返回默认值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(undefinedOr(undefined, defaultValue)).toBe(defaultValue);
    });

    test('测试8: 输入为非 undefined 值，返回原值，默认值为对象', () => {
        const defaultValue = { key: 'value' };
        expect(undefinedOr('valid', defaultValue)).toBe('valid');
        expect(undefinedOr(123, defaultValue)).toBe(123);
        expect(undefinedOr(true, defaultValue)).toBe(true);
    });

    test('测试9: 输入为 undefined，返回默认值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(undefinedOr(undefined, defaultValue)).toBe(defaultValue);
    });

    test('测试10: 输入为非 undefined 值，返回原值，默认值为数组', () => {
        const defaultValue = [1, 2, 3];
        expect(undefinedOr('valid', defaultValue)).toBe('valid');
        expect(undefinedOr(123, defaultValue)).toBe(123);
        expect(undefinedOr(true, defaultValue)).toBe(true);
    });
});
