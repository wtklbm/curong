// @ts-nocheck
import { wordRight } from '../src';

describe('wtool-string/wordRight', () => {
    test('测试1', () => {
        expect(wordRight).toThrowError();
        expect(() => wordRight(null)).toThrowError();
        expect(() => wordRight('xxx', 1.1)).toThrowError();
    });

    test('测试2', () => {
        expect(wordRight('')).toBe(null);
        expect(wordRight('x')).toBe(0);
        expect(wordRight('xx')).toBe(1);
        expect(wordRight(' xx')).toBe(2);
        expect(wordRight('xx ')).toBe(1);
    });

    test('测试3', () => {
        expect(wordRight('xx    xx    ', 2)).toBe(7);
        expect(wordRight('    xx    xx  ', 4)).toBe(11);
        expect(wordRight('    xx    xx  ', 11)).toBe(11);
        expect(wordRight('    xx    xx  ', 11)).toBe(11);
        expect(wordRight('    xx    xx  ', 12)).toBe(null);
    });
});
