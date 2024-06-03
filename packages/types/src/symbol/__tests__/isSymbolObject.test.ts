import { isSymbolObject } from '..';

describe('@curong/types/isSymbolObject', () => {
    test('测试1', () => {
        expect(isSymbolObject(12)).toBe(false);
        expect(isSymbolObject(null)).toBe(false);
        expect(isSymbolObject(Symbol('x'))).toBe(false);
    });

    test('测试2', () => {
        expect(isSymbolObject(Object(Symbol('x')))).toBe(true);
    });
});
