import { trimLeft } from '../src';

describe('@curong/string/trimLeft', () => {
    test('测试1', () => {
        expect(trimLeft(` \u3000xxx`)).toBe('xxx');
        expect(trimLeft(` \u3000xxx`, { space: false })).toBe(' \u3000xxx');
        expect(trimLeft(` \u200Bxxx`, { zeroWidth: false })).toBe('\u200Bxxx');
        expect(trimLeft(` \u3000xxx`, { likeSpace: false })).toBe('\u3000xxx');
        expect(trimLeft(`\t \u3000xxx`)).toBe('xxx');
        expect(trimLeft(`\t \u3000xxx`, { control: false })).toBe(
            '\t \u3000xxx'
        );
    });
});
