import { isStringPrimitive } from '..';

describe('@curong/types/isStringPrimitive', () => {
    test('测试1', () => {
        expect(isStringPrimitive(new String())).toBe(false);
        expect(isStringPrimitive(Object(''))).toBe(false);
        expect(isStringPrimitive(new Object(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isStringPrimitive('')).toBe(true);
        expect(isStringPrimitive(String(''))).toBe(true);
    });
});
