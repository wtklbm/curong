import { blank } from '..';

describe('@curong/regexp/blank', () => {
    test('测试1', () => {
        const r = new RegExp(blank);
        const s: string[] = [
            '\u0020',
            '\u1680',
            '\u2000',
            '\u200A',
            '\u2028',
            '\u2029',
            '\u202F',
            '\u205F',
            '\u3000'
        ];
        expect(s.every(v => r.test(v))).toBe(true);
    });
});
