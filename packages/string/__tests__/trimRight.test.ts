import { trimRight } from '../src';

describe('@curong/string/trimRight', () => {
    test('测试1', () => {
        expect(trimRight(`xxx \u3000`)).toBe('xxx');
        expect(trimRight(`xxx \u3000`, { space: false })).toBe('xxx ');
        expect(trimRight(`xxx \u200B`, { zeroWidth: false })).toBe(
            'xxx \u200B'
        );
        expect(trimRight(`xxx \u3000`, { likeSpace: false })).toBe(
            'xxx \u3000'
        );
        expect(trimRight(`xxx\t \u3000`)).toBe('xxx');
        expect(trimRight(`xxx\t \u3000`, { control: false })).toBe('xxx\t');
    });
});
