import { punctuation } from '..';

describe('@curong/regexp/punctuation', () => {
    test('测试1', () => {
        const r = new RegExp(punctuation);

        // https://en.wikipedia.org/wiki/Punctuation
        /* prettier-ignore */
        const enPunChars = [
            "-", "–", "_", "\\", "/", "|",
            ",", ".", "?", "!", ":", ";",
            "`", "'", '"',
            "+", "*", "~", "=", "<", ">",
            "^", "%", "&", "@", "#", "$",
            "(", ")", "[", "]", "{", "}",
        ];
        expect(enPunChars.every(v => r.test(v))).toBe(true);
    });

    test('测试2', () => {
        const r = new RegExp(punctuation);

        // https://zh.wikipedia.org/zh-cn/标点符号#常用標點符號
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
        const r = new RegExp(punctuation);

        // https://ko.wikipedia.org/wiki/문장_부호
        /* prettier-ignore */
        const koPunChars = [
            '―', '〃', '×', '○', 'ㅁ', '□'
        ];
        expect(koPunChars.every(v => r.test(v))).toBe(true);
    });

    test('测试4', () => {
        const r = new RegExp(punctuation);

        // https://ja.wikipedia.org/wiki/句読点
        /* prettier-ignore */
        const jaPunChars: string[] = [];
        expect(jaPunChars.every(v => r.test(v))).toBe(true);
    });
});
