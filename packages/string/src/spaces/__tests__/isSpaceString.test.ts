import { isSpaceString } from '..';

describe('@curong/string/isSpaceString', () => {
    test('测试1', () => {
        expect(isSpaceString('')).toBe(false);
    });

    test('测试2', () => {
        expect(isSpaceString(` \u3000 \u200B`)).toBe(true);
        expect(isSpaceString(` \u3000 \u200B`, { space: false })).toBe(false);
        expect(
            isSpaceString(` \u3000 \u200B\u202B\u2000`, { likeSpace: false })
        ).toBe(false);
    });

    test('测试2', () => {
        let s = ``;

        expect(isSpaceString(s)).toBe(false);

        s += ` `;
        expect(isSpaceString(s)).toBe(true);
        expect(isSpaceString(s, { space: false })).toBe(false);

        s += `\u200B`;
        expect(isSpaceString(s)).toBe(true);
        expect(isSpaceString(s, { zeroWidth: false })).toBe(false);

        s += `\u00A0`;
        expect(isSpaceString(s)).toBe(true);
        expect(isSpaceString(s, { likeSpace: false })).toBe(false);

        s += `\u2028`;
        expect(isSpaceString(s)).toBe(true);
        expect(isSpaceString(s, { control: false })).toBe(false);
    });
});
