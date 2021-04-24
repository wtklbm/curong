import { rmZeroWidthRight } from '../src';

describe('@curong/string/rmZeroWidthRight', () => {
    test('测试1', () => {
        expect(rmZeroWidthRight(`\u200B\u200Bx\u200Bxx\u200B\u200B`)).toBe(
            '\u200B\u200Bx\u200Bxx'
        );
    });
});
