import { rmZeroWidthEnd } from '../src';

describe('@curong/string/rmZeroWidthEnd', () => {
    test('测试1', () => {
        expect(rmZeroWidthEnd(`\u200B\u200Bx\u200Bxx\u200B\u200B`)).toBe(
            '\u200B\u200Bx\u200Bxx'
        );
    });
});
