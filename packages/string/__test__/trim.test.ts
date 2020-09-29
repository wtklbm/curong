import { trim } from '../src';

describe('@curong/string/trim', () => {
    test('测试1', () => {
        expect(trim(` \u3000xxx\u200B `)).toBe('xxx');
        expect(trim(` \u3000xxx \u200B`, { space: false })).toBe(' \u3000xxx ');
        expect(trim(` \u3000xxx \u200B`, { zeroWidth: false })).toBe(
            'xxx \u200B'
        );
        expect(trim(` \u3000xxx \u200B`, { likeSpace: false })).toBe(
            '\u3000xxx'
        );
        expect(trim(`\t \u3000xxx \u200B\b`)).toBe('xxx');
        expect(trim(`\t \u3000xxx \u200B\b`, { control: false })).toBe(
            '\t \u3000xxx \u200B\b'
        );
    });
});
