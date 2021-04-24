import { notStarts } from '../src';

describe('@curong/string/notStarts', () => {
    test('测试1', () => {
        expect(notStarts).toThrowError();
    });

    test('测试2', () => {
        expect(notStarts('', ['x'])).toBe(true);
        expect(notStarts('xxx', ['a', 'b', 'c'])).toBe(true);
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
