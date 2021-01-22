import { startsSlice } from '../src';

describe('@curong/string/startsSlice', () => {
    test('测试1', () => {
        expect(startsSlice).toThrowError();
        expect(() => startsSlice('xxx', 'x', { position: 1.1 })).toThrowError();
        expect(() => startsSlice('', 'x', { position: 1 })).toThrowError();
    });

    test('测试2', () => {
        expect(startsSlice('xxx', 'x', { position: 1 })).toBe('x');
        expect(
            startsSlice('xxx', 'X', {
                position: 1,
                preserve: true,
                caseSensitivity: false
            })
        ).toBe('xx');
        expect(startsSlice('xxx', 'x')).toBe('xx');
        expect(startsSlice('x x x', 'x ')).toBe('x x');
        expect(
            startsSlice('x x x', 'X ', {
                position: 2,
                preserve: true,
                caseSensitivity: false
            })
        ).toBe('x x');
        expect(startsSlice('x x x', 'x ', { preserve: true })).toBe('x x');
    });
});
