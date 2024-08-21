import { behindOf } from '..';

describe('@curong/string/behindOf', () => {
    test('测试1', () => {
        expect(behindOf).toThrowError();
    });

    test('测试2', () => {
        expect(behindOf('', ['x'])).toBe(false);
        expect(behindOf('this is xxx', ['x'])).toBe(true);
        expect(
            behindOf('this is xxx', ['a', 'b', 'c', 'x'], { position: 7 })
        ).toBe(true);
    });

    test('测试3', () => {
        expect(
            behindOf('this is xxx aaa bbb', ['this', 'is'], {
                position: 5
            })
        ).toBe(true);

        expect(
            behindOf('this is xxx aaa bbb', ['this', 'is'], {
                position: 6
            })
        ).toBe(false);

        expect(
            behindOf('this is xxx aaa bbb', ['This', 'Is'], {
                position: 5
            })
        ).toBe(false);

        expect(
            behindOf('this is xxx aaa bbb', ['This', 'Is'], {
                position: 5,
                caseSensitivity: false
            })
        ).toBe(true);
    });
});
