import { trimAll } from '..';

describe('@curong/string/trimAll', () => {
    test('测试1', () => {
        expect(trimAll(` \u3000xxx\u200B `)).toBe('xxx');
        expect(trimAll(` \u3000xxx \u200B`, { space: false })).toBe(' xxx ');
        expect(trimAll(` \u3000xxx \u200B`, { zeroWidth: false })).toBe(
            'xxx\u200B'
        );
        expect(trimAll(` \u3000xxx \u200B`, { likeSpace: false })).toBe(
            '\u3000xxx'
        );
        expect(trimAll(`\t \u3000xxx \u200B\b`)).toBe('xxx');
        expect(trimAll(`\t \u3000xxx \u200B\b`, { control: false })).toBe(
            '\txxx\b'
        );
    });
});
