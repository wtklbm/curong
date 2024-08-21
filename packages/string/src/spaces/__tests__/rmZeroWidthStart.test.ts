import { rmZeroWidthStart } from '..';

describe('@curong/string/rmZeroWidthStart', () => {
    test('测试1', () => {
        expect(rmZeroWidthStart(`\u200B\u200Bx\u200Bxx\u200B\u200B`)).toBe(
            'x\u200Bxx\u200B\u200B'
        );
    });
});
