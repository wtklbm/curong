import { rmZeroWidthLeft } from '../src';

describe('@curong/string/rmZeroWidthLeft', () => {
    test('测试1', () => {
        expect(rmZeroWidthLeft(`\u200B\u200Bx\u200Bxx\u200B\u200B`)).toBe(
            'x\u200Bxx\u200B\u200B'
        );
    });
});
