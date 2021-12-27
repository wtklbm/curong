import { isNullOrUndefined } from '../src';

describe('@curong/types/isNullOrUndefined', () => {
    test('测试1', () => {
        expect(isNullOrUndefined(12)).toBe(false);
        expect(isNullOrUndefined(0)).toBe(false);
        expect(isNullOrUndefined('')).toBe(false);
        expect(isNullOrUndefined(true)).toBe(false);
        expect(isNullOrUndefined(false)).toBe(false);
    });

    test('测试2', () => {
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);
    });
});
