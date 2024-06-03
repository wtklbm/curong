import { isSymbolPrimitive } from '..';

describe('@curong/types/isSymbolPrimitive', () => {
    test('测试1', () => {
        expect(isSymbolPrimitive(12)).toBe(false);
        expect(isSymbolPrimitive(null)).toBe(false);
    });

    test('测试2', () => {
        expect(isSymbolPrimitive(Symbol('x'))).toBe(true);
        expect(isSymbolPrimitive(Object(Symbol('x')))).toBe(false);
    });
});
