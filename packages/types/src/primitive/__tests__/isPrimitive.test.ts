import { isPrimitive } from '..';

describe('@curong/types/isPrimitive', () => {
    test('测试1', () => {
        expect(isPrimitive({})).toBe(false);
    });

    test('测试2', () => {
        expect(isPrimitive('')).toBe(true);
        expect(isPrimitive(1)).toBe(true);
        // @ts-ignore
        expect(isPrimitive(1n)).toBe(true);
        expect(isPrimitive(true)).toBe(true);
        expect(isPrimitive(null)).toBe(true);
        expect(isPrimitive(undefined)).toBe(true);
        expect(isPrimitive(Symbol('1'))).toBe(true);
    });
});
