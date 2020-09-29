import { isSymbol } from '../src';

describe('@curong/types/isSymbol', () => {
    test('测试1', () => {
        expect(isSymbol(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isSymbol(Symbol('x'))).toBe(true);
    });

    test('测试3', () => {
        expect(isSymbol(null)).toBe(false);
    });
});
