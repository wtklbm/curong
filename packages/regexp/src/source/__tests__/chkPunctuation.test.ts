import { chkPunctuation } from '..';

describe('@curong/regexp/chkPunctuation', () => {
    test('测试1', () => {
        const r = new RegExp(chkPunctuation);
        const s: string[] = [
            '\u2000',
            '\u206F',
            '\u2E00',
            '\u2E7F',
            '\u3000',
            '\u303F',
            '\uFF00',
            '\uFFEF',
            '\uFE30',
            '\uFE4F',
            '\uFE10',
            '\uFE1F'
        ];
        expect(s.every(v => r.test(v))).toBe(true);
    });
});
