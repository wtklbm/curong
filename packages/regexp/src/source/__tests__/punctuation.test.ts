import { punctuation } from '..';

describe('@curong/regexp/punctuation', () => {
    const r = new RegExp(punctuation);

    test('测试1', () => {
        // https://en.wikipedia.org/wiki/Punctuation
        // https://en.wikipedia.org/wiki/English_punctuation
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
        // https://ko.wikipedia.org/wiki/문장_부호
        /* prettier-ignore */
        const koPunChars = [
            '―', '〃', '×', '○', 'ㅁ', '□'
        ];
        expect(koPunChars.every(v => r.test(v))).toBe(true);
    });

    test('测试4', () => {
        // https://ja.wikipedia.org/wiki/句読点
        /* prettier-ignore */
        const jaPunChars: string[] = [];
        expect(jaPunChars.every(v => r.test(v))).toBe(true);
    });

    test('测试5', () => {
        // 测试有效的标点符号
        const validPunctuations = [
            '!', // 感叹号
            '"', // 引号
            '#', // 井号
            '$', // 美元符
            '%', // 百分号
            '&', // 和号
            "'", // 单引号
            '(', // 左括号
            ')', // 右括号
            '*', // 星号
            '+', // 加号
            ',', // 逗号
            '-', // 减号
            '.', // 句号
            '/', // 斜杠
            ':', // 冒号
            ';', // 分号
            '<', // 小于号
            '=', // 等号
            '>', // 大于号
            '?', // 问号
            '@', // ＠符
            '[', // 左方括号
            '\\', // 反斜杠
            ']', // 右方括号
            '^', // 幂符
            '_', // 下划线
            '`', // 反引号
            '{', // 左花括号
            '|', // 竖线
            '}', // 右花括号
            '~' // 波浪号
        ];

        validPunctuations.forEach(char => {
            expect(r.test(char)).toBe(true);
        });
    });

    test('测试6', () => {
        // 测试无效的字符
        const invalidCharacters = [
            'A', // 拉丁字母
            '1', // 数字
            ' ', // 空格
            '汉', // 汉字
            '😊', // 表情符
            '\u200B' // 零宽空格
        ];

        invalidCharacters.forEach(char => {
            expect(r.test(char)).toBe(false);
        });
    });

    test('测试7', () => {
        // 测试包含标点符号的混合字符串
        const mixedStrings = [
            'Hello, world!', // 包含标点符号
            '你好，世界', // 包含中文标点符号
            'Testing: 123', // 包含标点符号
            'A+B=C', // 包含标点符号
            'Hello (test)', // 包含标点符号
            'This is a test.' // 包含标点符号
        ];

        mixedStrings.forEach(str => {
            expect(r.test(str)).toBe(true);
        });
    });

    test('测试8', () => {
        // 测试没有标点符号的字符串
        const noPunctuationStrings = [
            'Hello World', // 仅拉丁字母
            '123456', // 仅数字
            '汉字测试', // 仅汉字
            '😊😊😊', // 仅表情符号
            ' ' // 仅空格
        ];

        noPunctuationStrings.forEach(str => {
            expect(r.test(str)).toBe(false);
        });
    });

    test('测试9', () => {
        expect(r.test('')).toBe(false); // 空字符串
        expect(r.test('\n')).toBe(false); // 换行符
        expect(r.test('\t')).toBe(false); // 制表符
    });
});
