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

    test('测试2', () => {
        const r = new RegExp(chkPunctuation);

        // https://zh.wikipedia.org/zh-cn/标点符号#常用標點符號
        // https://en.wikipedia.org/wiki/Chinese_punctuation
        /* prettier-ignore */
        const cnPunChars = [
            '。', '？', '！', '，', '、', '；', '：', '‘', '’', '“', '”',
            '﹃', '﹄', '「', '」', '﹁', '﹂', '『', '』',
            '（', '）', '［', '］', '〔', '〕', '【', '】',
            '…', '⋯', '－', '—', '＿', '～', '·', '．', '﹏',
            '《', '》', '〈', '〉'
        ];
        expect(cnPunChars.every(v => r.test(v))).toBe(true);
    });

    test('测试3', () => {
        const r = new RegExp(chkPunctuation);

        // https://ko.wikipedia.org/wiki/문장_부호
        /* prettier-ignore */
        const koPunChars = [
            '―', '〃', '×', '○', 'ㅁ', '□'
        ];
        expect(koPunChars.every(v => r.test(v))).toBe(true);
    });
});
