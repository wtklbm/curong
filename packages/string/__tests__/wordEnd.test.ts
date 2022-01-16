import { wordEnd } from '../src';

describe('@curong/string/wordEnd', () => {
    test('测试1', () => {
        expect(wordEnd).toThrowError();
        expect(() => wordEnd('xxx', 1.1)).toThrowError();
    });

    test('测试2', () => {
        expect(wordEnd('')).toBe(null);
        expect(wordEnd('x')).toBe(0);
        expect(wordEnd('xx')).toBe(1);
        expect(wordEnd(' xx')).toBe(2);
        expect(wordEnd('xx ')).toBe(1);
    });

    test('测试3', () => {
        expect(wordEnd('xx    xx    ', 2)).toBe(7);
        expect(wordEnd('    xx    xx  ', 4)).toBe(11);
        expect(wordEnd('    xx    xx  ', 11)).toBe(11);
        expect(wordEnd('    xx    xx  ', 11)).toBe(11);
        expect(wordEnd('    xx    xx  ', 12)).toBe(null);
    });
});
