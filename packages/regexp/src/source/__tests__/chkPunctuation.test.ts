import { chkPunctuation } from '..';

describe('@curong/regexp/chkPunctuation', () => {
    const regex = new RegExp(chkPunctuation);

    test('常规测试', () => {
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
        expect(s.every(v => regex.test(v))).toBe(true);
    });

    test('中文测试', () => {
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
        expect(cnPunChars.every(v => regex.test(v))).toBe(true);
    });

    test('韩文测试', () => {
        // https://ko.wikipedia.org/wiki/문장_부호
        /* prettier-ignore */
        const koPunChars = [
            '―', '〃', '×', '○', 'ㅁ', '□'
        ];
        expect(koPunChars.every(v => regex.test(v))).toBe(true);
    });

    test('匹配单个字符 \\xB7 (中点)', () => {
        expect(regex.test('\xB7')).toBe(true);
    });

    test('匹配单个字符 \\xD7 (乘号)', () => {
        expect(regex.test('\xD7')).toBe(true);
    });

    test('匹配单个字符 \\u22EF (水平省略号)', () => {
        expect(regex.test('\u22EF')).toBe(true);
    });

    test('匹配单个字符 \\u25A1 (空心方块)', () => {
        expect(regex.test('\u25A1')).toBe(true);
    });

    test('匹配单个字符 \\u25CB (空心圆)', () => {
        expect(regex.test('\u25CB')).toBe(true);
    });

    test('匹配单个字符 \\u3141', () => {
        expect(regex.test('\u3141')).toBe(true);
    });

    test('匹配范围 \\u2000 的起始字符', () => {
        expect(regex.test('\u2000')).toBe(true);
        expect(regex.test('\u206F')).toBe(true);
    });


    test('匹配范围 \\u2E00 的起始字符', () => {
        expect(regex.test('\u2E00')).toBe(true);
        expect(regex.test('\u2E7F')).toBe(true);
    });


    test('匹配范围 \\u3000 的起始字符', () => {
        expect(regex.test('\u3000')).toBe(true);
        expect(regex.test('\u303F')).toBe(true);
    });

    test('匹配范围 \\uFE10 的起始字符', () => {
        expect(regex.test('\uFE10')).toBe(true);
        expect(regex.test('\uFE1F')).toBe(true);
    });

    test('匹配范围 \\uFE30 的起始字符', () => {
        expect(regex.test('\uFE30')).toBe(true);
        expect(regex.test('\uFE4F')).toBe(true);
    });

    test('匹配范围 \\uFF00 的起始字符', () => {
        expect(regex.test('\uFF00')).toBe(true);
        expect(regex.test('\uFFEF')).toBe(true);
    });

    test('不匹配范围外的字符 \\u2070', () => {
        expect(regex.test('\u2070')).toBe(false);
    });
});
