import { trimEnd } from '../src';

describe('@curong/string/trimEnd', () => {
    test('测试1', () => {
        expect(trimEnd(`xxx \u3000`)).toBe('xxx');
        expect(trimEnd(`xxx \u3000`, { space: false })).toBe('xxx ');
        expect(trimEnd(`xxx \u200B`, { zeroWidth: false })).toBe(
            'xxx \u200B'
        );
        expect(trimEnd(`xxx \u3000`, { likeSpace: false })).toBe(
            'xxx \u3000'
        );
        expect(trimEnd(`xxx\t \u3000`)).toBe('xxx');
        expect(trimEnd(`xxx\t \u3000`, { control: false })).toBe('xxx\t');
    });
});
