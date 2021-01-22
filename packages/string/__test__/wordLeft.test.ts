
import { wordLeft } from '../src';

describe('@curong/string/wordLeft', () => {
    test('测试1', () => {
        expect(wordLeft).toThrowError();
        expect(() => wordLeft('xxx', 1.1)).toThrowError();
    });

    test('测试2', () => {
        expect(wordLeft('')).toBe(null);
        expect(wordLeft('x')).toBe(0);
        expect(wordLeft('xx')).toBe(0);
        expect(wordLeft(' xx')).toBe(1);
        expect(wordLeft('xx ')).toBe(0);
    });

    test('测试3', () => {
        expect(wordLeft('xx    xx    ', 2)).toBe(6);
        expect(wordLeft('xx    xx    ', 8)).toBe(null);
        expect(wordLeft('    xx    xx    ')).toBe(4);
        expect(wordLeft('    xx    xx    ', 12)).toBe(null);
        expect(wordLeft('    xx    xx', 6)).toBe(10);
        expect(wordLeft('  xx    xx', 2)).toBe(2);
    });
});
