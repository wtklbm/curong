import { notStarts } from '../src';

describe('@curong/string/notStarts', () => {
    test('测试1', () => {
        expect(notStarts).toThrowError();
        // @ts-ignore
        expect(() => notStarts('xxx', 'x')).toThrowError();
        // @ts-ignore
        expect(() => notStarts('xxx', [12, 'x', /\d/])).toThrowError();
    });

    test('测试2', () => {
        expect(notStarts('', ['x'])).toBe(true);
        expect(notStarts('xxx', ['a', 'b', 'c'])).toBe(true);
        //@ts-ignore
        expect(notStarts('xxx', ['x', 12, /\d/])).toBe(false);
        expect(notStarts('xxx', ['x'])).toBe(false);
        expect(notStarts('x x x', ['x', 'a', 'b'])).toBe(false);
        expect(notStarts('x x x', ['x', 'a', 'b'], { position: 1 })).toBe(true);
        expect(
            notStarts('x x x', ['X', 'a', 'b'], {
                position: 2,
                caseSensitivity: false
            })
        ).toBe(false);
    });
});
