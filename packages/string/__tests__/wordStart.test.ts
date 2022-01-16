import { wordStart } from '../src';

describe('@curong/string/wordStart', () => {
    test('测试1', () => {
        expect(wordStart).toThrowError();
        expect(() => wordStart('xxx', 1.1)).toThrowError();
    });

    test('测试2', () => {
        expect(wordStart('')).toBe(null);
        expect(wordStart('x')).toBe(0);
        expect(wordStart('xx')).toBe(0);
        expect(wordStart(' xx')).toBe(1);
        expect(wordStart('xx ')).toBe(0);
    });

    test('测试3', () => {
        expect(wordStart('xx    xx    ', 2)).toBe(6);
        expect(wordStart('xx    xx    ', 8)).toBe(null);
        expect(wordStart('    xx    xx    ')).toBe(4);
        expect(wordStart('    xx    xx    ', 12)).toBe(null);
        expect(wordStart('    xx    xx', 6)).toBe(10);
        expect(wordStart('  xx    xx', 2)).toBe(2);
    });
});
