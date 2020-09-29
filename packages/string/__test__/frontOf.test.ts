import { frontOf } from '../src';

describe('@curong/string/frontOf', () => {
    test('测试1', () => {
        expect(frontOf).toThrowError();
        // @ts-ignore
        expect(() => frontOf('xxx', 'x')).toThrowError();
        // @ts-ignore
        expect(() => frontOf('xxx', [12, 'x', /\d/])).toThrowError();
    });

    test('测试2', () => {
        expect(frontOf('', ['x'])).toBe(false);
        expect(frontOf('this is xxx', ['x'])).toBe(true);
        expect(
            frontOf('this is xxx', ['a', 'b', 'c', 'x'], { position: 7 })
        ).toBe(false);
        expect(
            frontOf('this is xxx', ['a', 'b', 'c', 'x'], { position: 8 })
        ).toBe(true);
    });

    test('测试3', () => {
        expect(
            frontOf('this is xxx aaa bbb', ['a', 'b', 'c', 'x'], {
                position: 7
            })
        ).toBe(false);
        expect(
            frontOf('this X ABC is xxx aaa bbb', ['a', 'b', 'c', 'x'], {
                position: 13,
                caseSensitivity: false
            })
        ).toBe(true);

        expect(
            frontOf('this X ABC is xxx aaa bbb', ['a', 'b', 'c', 'x'], {
                position: 5,
                caseSensitivity: false
            })
        ).toBe(true);
    });
});
