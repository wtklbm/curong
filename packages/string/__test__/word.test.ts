
import { word } from '../src';

describe('@curong/string/word', () => {
    test('测试1', () => {
        expect(word).toThrowError();
        expect(() => word('xxx', 1.1)).toThrowError();
    });

    test('测试2', () => {
        expect(word('')).toBe(null);
        expect(word('x')).toEqual({ left: 0, right: 0 });
        expect(word('xx')).toEqual({ left: 0, right: 1 });
        expect(word(' xx')).toEqual({ left: 1, right: 2 });
        expect(word('xx ')).toEqual({ left: 0, right: 1 });
    });

    test('测试3', () => {
        expect(word('xx    xx    ', 2)).toEqual({ left: 6, right: 7 });
        expect(word('    xx    xx    ')).toEqual({ left: 4, right: 11 });
        expect(word('    xx    xx    ', 11)).toEqual({ left: 11, right: 11 });
        expect(word('    xx    xxx   ', 11)).toEqual({ left: 11, right: 12 });
        expect(word('    xx    xx    ', 12)).toBe(null);
        expect(word('    xx    xx ', 4)).toEqual({ left: 4, right: 11 });
        expect(word('    xx    xx ', 6)).toEqual({ left: 10, right: 11 });
    });
});
