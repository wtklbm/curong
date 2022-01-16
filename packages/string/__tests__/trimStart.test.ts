import { trimStart } from '../src';

describe('@curong/string/trimStart', () => {
    test('测试1', () => {
        expect(trimStart(` \u3000xxx`)).toBe('xxx');
        expect(trimStart(` \u3000xxx`, { space: false })).toBe(' \u3000xxx');
        expect(trimStart(` \u200Bxxx`, { zeroWidth: false })).toBe('\u200Bxxx');
        expect(trimStart(` \u3000xxx`, { likeSpace: false })).toBe('\u3000xxx');
        expect(trimStart(`\t \u3000xxx`)).toBe('xxx');
        expect(trimStart(`\t \u3000xxx`, { control: false })).toBe(
            '\t \u3000xxx'
        );
    });
});
