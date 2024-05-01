import { isSymbolArray } from '../src';

describe('@curong/types/isSymbolArray', () => {
    test('测试1', () => {
        expect(isSymbolArray(0)).toBe(false);
        expect(isSymbolArray('')).toBe(false);
        expect(isSymbolArray(Symbol('1'))).toBe(false);
        expect(isSymbolArray([Symbol('1'), 1])).toBe(false);
        expect(isSymbolArray([Symbol('1'), ''])).toBe(false);
    });

    test('测试2', () => {
        expect(isSymbolArray([Symbol('1')])).toBe(true);
        expect(isSymbolArray([Symbol('1'), Symbol('1')])).toBe(true);
    });
});
