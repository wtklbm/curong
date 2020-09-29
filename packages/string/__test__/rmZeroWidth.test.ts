import { rmZeroWidth } from '../src';

describe('@curong/string/rmZeroWidth', () => {
    test('测试1', () => {
        expect(rmZeroWidth(`\u200B\u200Bx\u200Bxx\u200B\u200B`)).toBe('xxx');
    });
});
