import { isString } from '..';

describe('@curong/types/isString', () => {
    test('测试1', () => {
        expect(isString(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isString('')).toBe(true);
        expect(isString(String(''))).toBe(true);
        expect(isString(new String())).toBe(true);
        expect(isString(Object(''))).toBe(true);
        expect(isString(new Object(''))).toBe(true);
    });

    test('测试3', () => {
        expect(isString(null)).toBe(false);
    });
});
