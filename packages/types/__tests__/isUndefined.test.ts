import { isUndefined } from '../src';

describe('@curong/types/isUndefined', () => {
    test('测试1', () => {
        expect(isUndefined(undefined)).toBe(true);
    });

    test('测试2', () => {
        expect(isUndefined('')).toBe(false);
    });

    test('测试3', () => {
        expect(isUndefined(null)).toBe(false);
    });

    test('测试4', () => {
        expect(isUndefined('hello')).toBe(false);
    });
});
